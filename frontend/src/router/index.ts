import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAdminStore } from '@/stores/admin'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('../views/AdminLoginView.vue'),
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: () => import('../views/AdminDashboardView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/properties',
      name: 'admin-properties',
      component: () => import('../views/AdminPropertiesView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/properties/new',
      name: 'admin-property-new',
      component: () => import('../views/AdminPropertyFormView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/properties/:id/edit',
      name: 'admin-property-edit',
      component: () => import('../views/AdminPropertyFormView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/admin/interests',
      name: 'admin-interests',
      component: () => import('../views/AdminInterestsView.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

// Auth guard
router.beforeEach((to, from, next) => {
  const adminStore = useAdminStore()
  
  // Check auth status
  adminStore.checkAuth()
  
  if (to.meta.requiresAuth && !adminStore.isAuthenticated) {
    next('/admin/login')
  } else {
    next()
  }
})

export default router
