
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Dashboard from '../views/Dashboard.vue';
import { useAuthStore } from '../stores/auth';

const router = createRouter({
     history: createWebHistory(import.meta.env.BASE_URL),
     routes: [
          {
               path: '/',
               name: 'Home',
               component: Home
          },
          {
               path: '/login',
               name: 'Login',
               component: Login
          },
          {
               path: '/register',
               name: 'Register',
               component: Register
          },
          {
               path: '/dashboard',
               name: 'Dashboard',
               component: Dashboard,
               meta: { requiresAuth: true }
          }
     ]
});

router.beforeEach((to, from, next) => {
     const authStore = useAuthStore();
     if (to.meta.requiresAuth && !authStore.isAuthenticated) {
          next('/login');
     } else if (authStore.isAuthenticated && (to.path === '/login' || to.path === '/register')) {
          next('/dashboard');
     } else {
          next();
     }
});

export default router;
