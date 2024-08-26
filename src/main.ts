import { createApp } from 'vue'
import { createVuetify } from 'vuetify';
import { store } from './store';
import '@mdi/font/css/materialdesignicons.css';
import router from './router';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import './assets/style/global/index.sass';
import 'vuetify/styles'

import App from './App.vue';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
});

const app = createApp(App)

app.use(router);
app.use(vuetify);
app.use(store);

app.mount('#app');