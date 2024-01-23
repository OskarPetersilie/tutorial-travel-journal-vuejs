<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const journalId = ref(route.query.journalId);
const title = ref('');
const description = ref('');
const photo = ref(null); 
const country = ref('');
const city = ref('');
const photoPreview = ref(null); 
const isLoading = ref(false);


const getImageUrl = (imageId) => {
  return `https://travel-journal.directus.app/assets/${imageId}`;
};


watch(journalId, async (newJournalId) => {
  if (newJournalId) {
    try {
      isLoading.value = true;
      const response = await axios.get(`https://travel-journal.directus.app/items/journals/${newJournalId}`);
      const journalData = response.data.data;

      title.value = journalData.title;
      description.value = journalData.description;
      country.value = journalData.country;
      city.value = journalData.city;
      photoPreview.value = getImageUrl(journalData.photo); 
    } catch (error) {
      console.error('Error fetching journal:', error);
    } finally {
      isLoading.value = false;
    }
  }
}, { immediate: true });


const handleFile = (file) => {
  photo.value = file;
  const reader = new FileReader();
  reader.onload = (e) => {
    photoPreview.value = e.target.result; 
  };
  reader.readAsDataURL(file);
};


const uploadImageToDirectus = async () => {
  const formData = new FormData();
  formData.append('file', photo.value);

  try {
    const response = await axios.post('https://travel-journal.directus.app/files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data.id; 
  } catch (error) {
    console.error('Image upload failed:', error);
    throw error;
  }
};


const handleSubmit = async () => {
  isLoading.value = true;
  try {
    let imageUUID;
    if (photo.value) {
      
      imageUUID = await uploadImageToDirectus();
    } else {
      const imageIdMatch = photoPreview.value.match(/\/assets\/(.+)$/);
      imageUUID = imageIdMatch ? imageIdMatch[1] : null;
    }

    const journalData = {
      title: title.value,
      description: description.value,
      country: country.value,
      city: city.value,
      photo: imageUUID,
    };

    let response;
    if (journalId.value) {
      response = await axios.patch(`https://travel-journal.directus.app/items/journals/${journalId.value}`, journalData);
    } else {
      response = await axios.post('https://travel-journal.directus.app/items/journals', journalData);
    }

    console.log('Journal entry processed:', response.data);
    router.push({ name: 'readjournal' });
  } catch (error) {
    console.error('Journal submission failed:', error);
    if (error.response) {
      console.error('Error response data:', error.response.data);
    }
  } finally {
    isLoading.value = false;
  }
};
</script>


<template>
  <div class="add-journal-container">
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="title" required>
      </div>

      <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" v-model="description" required></textarea>
      </div>

      <div class="form-group">
        <label for="city">City:</label>
        <input type="text" id="city" v-model="city" required>
      </div>

      <div class="form-group">
        <label for="country">Country:</label>
        <input type="text" id="country" v-model="country" required>
      </div>

      <div class="form-group">
        <label for="photo">Photo:</label>
        <input type="file" id="photo" @change="handleFile($event.target.files[0])"> 
      </div>

      <div class="photo-preview" v-if="photoPreview">
        <img :src="photoPreview" alt="Photo Preview" />
      </div>

      <button type="submit" v-if="!isLoading">Submit</button>
      <div v-if="isLoading">Submitting...</div>
    </form>
  </div>
</template>
  

<style scoped>
.add-journal-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; 
  background-color: #f5f5f5; 
  font-family: Arial, sans-serif; 
}

.form-group {
  margin-bottom: 15px;
}

form {
  padding: 20px;
  border: 1px solid #ddd; 
  border-radius: 4px; 
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  max-width: 300px; 
  width: 100%;
}

label {
  display: block;
  margin-bottom: 5px; 
}

input[type="text"], textarea, input[type="file"] {
  width: 100%; 
  padding: 8px;
  border: 1px solid #ddd; 
  border-radius: 4px; 
  box-sizing: border-box; 
}

button {
  width: 100%; 
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #4CAF50; 
  color: white; 
  font-size: 16px;
  cursor: pointer; 
  transition: background-color 0.3s; 
}

button:hover {
  background-color: #45a049; 
}

.photo-preview img {
  max-width: 150px; 
  max-height: 150px;
  object-fit: cover;
}

</style>
