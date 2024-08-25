import { createApp } from 'vue'
import router from './router';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import './assets/style/global/index.sass';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles'
// import 'material-design-icons-iconfont/dist/material-design-icons.css';

import App from './App.vue';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', // Define MDI como o conjunto de ícones padrão
  },
});

const app = createApp(App)


app.use(router);
app.use(vuetify);

app.mount('#app');