<script setup>
import { RouterView } from 'vue-router'
import MainLayout from './layouts/MainLayout.vue';
</script>

<template>
  <MainLayout>
    <RouterView />
  </MainLayout>
</template>

<style>
:root {
  --primary-color: #8B4513;
  --secondary-color: #F5DEB3;
  --background-color: #FAF0E6;
  --text-color: #333;
}

body {
  font-family: 'Roboto', sans-serif;
  background-color: var(--background-color);
  color: var(--text-color);
  margin: 0;
  padding: 0;
}

.primary-bg {
  background-color: var(--primary-color) !important;
}

.secondary-bg {
  background-color: var(--secondary-color) !important;
}

.primary-text {
  color: var(--primary-color) !important;
}

h1, h2, h3, h4, h5, h6 {
  color: var(--primary-color);
}
</style>