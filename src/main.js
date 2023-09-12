import { createApp } from 'vue';
import App from './App.vue';
import Analytics from '@vercel/analytics';

const app = createApp(App);
app.component('VercelAnalytics', Analytics);
app.mount('#app');
