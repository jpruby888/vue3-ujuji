import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/styles/app.scss'
import router from '@/router'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
//iconify
import '@purge-icons/generated' // <-- This

//pinia
const pinia = createPinia()
const app = createApp(App)
app.use(router).use(pinia)
app.mount('#app')
