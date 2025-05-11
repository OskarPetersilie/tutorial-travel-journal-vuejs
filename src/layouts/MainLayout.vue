<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const drawer = ref(false);

const navigationItems = [
  { title: 'Über uns', icon: 'mdi-information', route: '/ueber-uns' },
  { title: 'Veranstaltungen', icon: 'mdi-calendar', route: '/veranstaltungen' },
  { title: 'Projekte', icon: 'mdi-lightbulb', route: '/events' },
  { title: 'Beratung', icon: 'mdi-chat-processing', route: '/beratung' },
  { title: 'Galerie', icon: 'mdi-image', route: '/galerie' },
  { title: 'Kontakt', icon: 'mdi-email', route: '/kontakt' },
  { title: 'Mitwirken', icon: 'mdi-hand-heart', route: '/mitwirken' },
  { title: 'Raum mieten', icon: 'mdi-home', route: '/raum-mieten' },
];

const isActive = (route) => {
  return window.location.pathname === route;
};
</script>

<template>
  <v-app>
    <!-- Header Section -->
    <v-app-bar>
        <template v-slot:append>
            <v-app-bar-nav-icon @click="drawer = !drawer" color="primary"></v-app-bar-nav-icon>
        </template>
    </v-app-bar>

    <v-container class="mt-12" fluid >
        <div class="d-flex justify-center ">
            <v-img
                src="@/assets/banner.png"
                alt="Towanda Banner"
                cover
            />
        </div>
    </v-container>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      location="right"
      temporary
      app
    >
      <v-list>
        <v-list-item
          v-for="item in navigationItems"
          :key="item.title"
          :to="item.route"
          :active="isActive(item.route)"
          active-color="primary"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main class="pt-0">
        <slot></slot>
    </v-main>

    <!-- Footer -->
    <v-footer
      color="#8B4513"
      app
      class="px-0"
    >
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <h3 class="text-h6 text-white mb-4">Frauenzentrum TOWANDA</h3>
            <div class="text-white">
              <p>Wagnergasse 25<br>
              07743 Jena<br>
              Tel: 03641 123456<br>
              Email: info@towanda-jena.de</p>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <h3 class="text-h6 text-white mb-4">Öffnungszeiten</h3>
            <div class="text-white">
              <p>Montag - Freitag: 9:00 - 18:00 Uhr<br>
              Samstag: Nach Vereinbarung<br>
              Sonntag: Geschlossen</p>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <h3 class="text-h6 text-white mb-4">Links</h3>
            <div class="d-flex flex-column">
              <router-link to="/impressum" class="text-white text-decoration-none mb-2">Impressum</router-link>
              <router-link to="/datenschutz" class="text-white text-decoration-none mb-2">Datenschutz</router-link>
              <router-link to="/kontakt" class="text-white text-decoration-none">Kontakt</router-link>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="text-center mt-4">
            <div class="text-white text-caption">
              &copy; {{ new Date().getFullYear() }} Frauenzentrum TOWANDA Jena e.V. Alle Rechte vorbehalten.
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<style scoped>
.primary--text {
  color: #8B4513 !important;
}

.v-btn--active {
  border-bottom: 2px solid white;
}
</style>