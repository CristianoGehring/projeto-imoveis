<template>
  <header class="admin-header">
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <router-link to="/admin/dashboard">
            <h2>🏠 PrimeHomes</h2>
          </router-link>
        </div>

        <nav class="nav-menu">
          <router-link to="/admin/dashboard" class="nav-link">
            Dashboard
          </router-link>
          <router-link to="/admin/properties" class="nav-link">
            Imóveis
          </router-link>
          <router-link to="/admin/interests" class="nav-link">
            Interesses
          </router-link>
        </nav>

        <div class="header-actions">
          <div class="user-info">
            <span>{{ currentUser?.name || 'Administrador' }}</span>
          </div>
          <button @click="handleLogout" class="btn-logout">
            Sair
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '@/stores/admin'

const adminStore = useAdminStore()
const router = useRouter()

const currentUser = computed(() => adminStore.currentUser)

const handleLogout = async () => {
  if (confirm('Tem certeza que deseja sair?')) {
    await adminStore.logout()
    router.push('/admin/login')
  }
}
</script>

<style scoped>
.admin-header {
  background: white;
  border-bottom: 1px solid #e1e5e9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

.logo h2 {
  margin: 0;
  color: #667eea;
  font-size: 1.4rem;
  font-weight: 700;
}

.logo a {
  text-decoration: none;
}

.nav-menu {
  display: flex;
  gap: 30px;
}

.nav-link {
  color: #666;
  text-decoration: none;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 6px;
  transition: color 0.3s, background 0.3s;
}

.nav-link:hover {
  color: #667eea;
  background: #f8f9ff;
}

.nav-link.router-link-active {
  color: #667eea;
  background: #f8f9ff;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.user-info span {
  color: #333;
  font-weight: 500;
  font-size: 0.9rem;
}

.btn-logout {
  background: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-logout:hover {
  background: #c82333;
}

@media (max-width: 768px) {
  .header-content {
    flex-wrap: wrap;
    height: auto;
    padding: 15px 0;
    gap: 15px;
  }
  
  .nav-menu {
    order: 3;
    flex-basis: 100%;
    justify-content: center;
    padding-top: 15px;
    border-top: 1px solid #eee;
  }
  
  .nav-menu {
    gap: 15px;
  }
  
  .header-actions {
    gap: 15px;
  }
  
  .user-info span {
    display: none;
  }
}
</style>