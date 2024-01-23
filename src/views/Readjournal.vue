<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

import { useRouter } from 'vue-router';

const router = useRouter();
const journals = ref([]);


onMounted(async () => {
  try {
    const response = await axios.get('https://travel-journal.directus.app/items/journals');
    journals.value = response.data.data;
  } catch (error) {
    console.error('Error fetching journals:', error);
  }
});

const editJournal = (journal) => {
  router.push({ name: 'addjournal', query: { journalId: journal.id } });
  console.log(journal)
};


const deleteJournal = async (journalId) => {
  try {
    await axios.delete(`https://travel-journal.directus.app/items/journals/${journalId}`);
    journals.value = journals.value.filter(journal => journal.id !== journalId);
  } catch (error) {
    console.error('Error deleting journal:', error);
  }
};

const getImageUrl = (imageId) => {
  return `https://travel-journal.directus.app/assets/${imageId}`;
};

</script>

  
<template>
    <div class="read-journal-container">
      <div class="journal-list">
        <div v-for="journal in journals" :key="journal.id" class="journal-entry card">
          <div class="content"><h3>{{ journal.title }}</h3></div>
          <div class="content">{{ journal.description }}</div>
          <div class="content">
                <p><b>City</b>: {{ journal.city }}</p>
                <p><b>Country</b>: {{ journal.country }}</p>
          </div>
          <div class="content"><img :src="getImageUrl(journal.photo)" alt="Journal Photo" class="journal-photo"/></div>
          <div class="journal-actions">
            <button @click="editJournal(journal)" class="edit-button">Edit</button>
            <button @click="deleteJournal(journal.id)" class="delete-button">Delete</button>
          </div>
        </div>
      </div>
    </div>
</template>
  
<style scoped>
.read-journal-container {
    display: flex;
    flex-direction: column;
}
  
.journal-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px; 
    padding: 20px; 
}

@media (max-width: 1200px) {
  .journal-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 800px) {
  .journal-list {
    grid-template-columns: repeat(2, 1fr); 
  }
}

@media (max-width: 500px) {
  .journal-list {
    grid-template-columns: 1fr; 
  }
}

.card {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.journal-photo {
    width: 100px;
    height: 100px;
    display: block;
    margin-bottom: 10px;
}

.journal-actions {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
}
  
.edit-button, .delete-button {
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    color: white;
    font-weight: bold;
}

.edit-button {
    background-color: #4CAF50;
}
  
.delete-button {
    background-color: #f44336;
}
  
.edit-button:hover {
    background-color: #45a049;
}
  
.delete-button:hover {
    background-color: #d32f2f;
}

.content {
   margin-bottom: 10px;
   border: 2px solid black;
   padding: 10px;
}


.journal-entry {
  width: 100%; 
  margin-bottom: 30px;
}
</style>

  