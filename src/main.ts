import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
const pinia = createPinia()
import "@fontsource/oxygen/300.css";
import "@fontsource/oxygen/400.css";

createApp(App).use(router).use(pinia).mount('#app')
