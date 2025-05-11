<!-- NotFound.vue -->
<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="text-center pa-6" elevation="10">
          <v-card-title class="text-h3 font-weight-bold">
            404
          </v-card-title>
          
          <v-card-subtitle class="text-h5 mt-2">
            Page Not Found
          </v-card-subtitle>
          
          <v-card-text>
            <p class="mb-4">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
            <v-icon size="100" color="primary" class="my-4">mdi-alert-circle-outline</v-icon>
          </v-card-text>
          
          <v-card-actions class="justify-center">
            <v-btn
              color="primary"
              to="/"
              variant="elevated"
              prepend-icon="mdi-home"
            >
              Back to Home
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'NotFound',
}
</script>

<style scoped>
/* You can add custom styles here if needed */
</style>