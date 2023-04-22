import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import i18n from './plugins/i18n';

import Particles from 'vue3-particles';

import './assets/css/main.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(Particles);

app.mount('#app');
