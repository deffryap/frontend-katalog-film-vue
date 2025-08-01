import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/movie/:id',
      name: 'movieDetail',
      // Lazy loading: komponen hanya dimuat saat rute diakses
      component: () => import('../views/MovieDetailView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
      meta: { requiresAuth: true } // Menandakan rute ini butuh login
    }
  ]
})

// Navigation Guard: "Penjaga" sebelum memasuki rute
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // Jika rute memerlukan autentikasi dan pengguna belum login
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Alihkan ke halaman login
    next({ name: 'login' })
  } else {
    // Lanjutkan ke rute tujuan
    next()
  }
})

export default router
