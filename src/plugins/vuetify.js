// plugins/vuetify.js
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#8B4513',   // Brown color from the website
          secondary: '#F5DEB3', // Wheat color for secondary elements
          accent: '#B22222',    // FireBrick for accent
          error: '#B71C1C',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          background: '#FAF0E6', // Linen color for background
        }
      }
    }
  }
});