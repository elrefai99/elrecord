import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import 'virtual:uno.css'
import './style.css'
import App from './App.vue'
import { useAuthStore } from './stores/auth'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Initialize auth check
const authStore = useAuthStore()
authStore.fetchProfile().catch(() => {
     // Session likely expired or not logged in, silent fail
     console.log('No active session found');
})

app.mount('#app')
