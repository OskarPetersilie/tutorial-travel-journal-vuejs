<script setup>
import { ref, onMounted } from 'vue';
import { createDirectus, rest, readItems, deleteItem } from '@directus/sdk';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute()
const events = ref([]);
const directusEndpoint = import.meta.env.VITE_DIRECTUS_ENDPOINT || 'http://localhost:8055';
const client = createDirectus(directusEndpoint).with(rest());

onMounted(async () => {
  try {
    const response = await client.request(readItems('events'));
    console.log("Full response:", response);
    events.value = response;
    console.log("journlas value from readevent:", events.value);
  } catch (error) {
    console.error('Error fetching events:', error);
  }
});

const editevent = (event) => {
  router.push({ name: 'addevent', query: { eventId: event.id }});
  console.log("Editing event:", event.id);
};

const deleteevent = async (eventId) => {
  try {
    await client.request(deleteItem('events', eventId));
    events.value = events.value.filter((event) => event.id !== eventId);
    console.log("event deleted:", eventId);
  } catch (error) {
    console.error('Error deleting event:', error);
  }
};

const getImageUrl = (imageId) => {
  return `${directusEndpoint}/assets/${imageId}`;
};
</script>

  
<template>
    <div class="read-event-container">
      <div class="event-list">
        <div v-for="event in events" :key="event.id" class="event-entry card">
          <div class="content"><h3>{{ event.title }}</h3></div>
          <div class="content">{{ event.description }}</div>
          <div class="content"><img :src="getImageUrl(event.photo)" alt="event Photo" class="event-photo"/></div>

        </div>
      </div>
    </div>
</template>
  
<style scoped>
.read-event-container {
    display: flex;
    flex-direction: column;
}
  
.event-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px; 
    padding: 20px; 
}

@media (max-width: 1200px) {
  .event-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 800px) {
  .event-list {
    grid-template-columns: repeat(2, 1fr); 
  }
}

@media (max-width: 500px) {
  .event-list {
    grid-template-columns: 1fr; 
  }
}

.card {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.event-photo {
    width: 100px;
    height: 100px;
    display: block;
    margin-bottom: 10px;
}

.content {
   margin-bottom: 10px;
   border: 2px solid black;
   padding: 10px;
}


.event-entry {
  width: 100%; 
  margin-bottom: 30px;
}
</style>

  