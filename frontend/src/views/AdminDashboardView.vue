<template>
  <div class="admin-dashboard">
    <AdminHeader />
    
    <main class="dashboard-content">
      <div class="container">
        <div class="dashboard-header">
          <h1>Dashboard</h1>
          <p>Bem-vindo ao painel administrativo</p>
        </div>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon properties">🏠</div>
            <div class="stat-content">
              <h3>{{ totalProperties }}</h3>
              <p>Imóveis no Portfólio</p>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon interests">💬</div>
            <div class="stat-content">
              <h3>{{ totalInterests }}</h3>
              <p>Leads Gerados</p>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon cities">🌆</div>
            <div class="stat-content">
              <h3>{{ cities.length }}</h3>
              <p>Cidades Atendidas</p>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon neighborhoods">📍</div>
            <div class="stat-content">
              <h3>{{ neighborhoods.length }}</h3>
              <p>Regiões Cobertas</p>
            </div>
          </div>
        </div>

        <div class="dashboard-sections">
          <div class="section">
            <div class="section-header">
              <h2>Ações Rápidas</h2>
            </div>
            <div class="quick-actions">
              <router-link to="/admin/properties/new" class="action-card">
                <div class="action-icon">➕</div>
                <div class="action-content">
                  <h3>Cadastrar Imóvel</h3>
                  <p>Adicionar nova propriedade ao catálogo</p>
                </div>
              </router-link>

              <router-link to="/admin/properties" class="action-card">
                <div class="action-icon">🏢</div>
                <div class="action-content">
                  <h3>Portfólio</h3>
                  <p>Gerenciar todos os imóveis</p>
                </div>
              </router-link>

              <router-link to="/admin/interests" class="action-card">
                <div class="action-icon">📞</div>
                <div class="action-content">
                  <h3>Contatos</h3>
                  <p>Visualizar leads e interessados</p>
                </div>
              </router-link>
            </div>
          </div>

          <div class="section">
            <div class="section-header">
              <h2>Atividade Recente</h2>
            </div>
            <div class="activity-list">
              <div v-if="loading" class="loading">
                <p>Carregando atividades...</p>
              </div>
              <div v-else-if="recentInterests.length === 0" class="no-activity">
                <p>Nenhuma atividade recente</p>
              </div>
              <div v-else>
                <div v-for="interest in recentInterests.slice(0, 5)" :key="interest.id" 
                     class="activity-item">
                  <div class="activity-info">
                    <h4>{{ interest.name }}</h4>
                    <p>Interesse no imóvel: {{ interest.property?.title }}</p>
                    <small>{{ formatDate(interest.createdAt) }}</small>
                  </div>
                  <div class="activity-actions">
                    <button @click="viewInterest(interest)" class="btn-sm">
                      Ver Detalhes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '@/stores/admin'
import AdminHeader from '@/components/AdminHeader.vue'

const adminStore = useAdminStore()
const router = useRouter()

// Computed
const totalProperties = computed(() => adminStore.totalProperties)
const totalInterests = computed(() => adminStore.totalInterests)
const cities = computed(() => adminStore.cities)
const neighborhoods = computed(() => adminStore.neighborhoods)
const loading = computed(() => adminStore.loading)
const recentInterests = computed(() => 
  [...adminStore.interests].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
)

// Methods
const viewInterest = (interest) => {
  router.push(`/admin/interests/${interest.id}`)
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Lifecycle
onMounted(async () => {
  if (!adminStore.isAuthenticated) {
    router.push('/admin/login')
    return
  }

  await Promise.all([
    adminStore.fetchProperties(),
    adminStore.fetchInterests(),
    adminStore.fetchCities()
  ])
})
</script>

<style scoped>
.admin-dashboard {
  min-height: 100vh;
  background: #f8f9fa;
}

.dashboard-content {
  padding: 30px 0;
}

.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 40px;
}

.dashboard-header {
  margin-bottom: 40px;
}

.dashboard-header h1 {
  margin: 0 0 8px 0;
  color: #333;
  font-size: 2.5rem;
  font-weight: 600;
}

.dashboard-header p {
  margin: 0;
  color: #666;
  font-size: 1.1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 16px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.stat-icon.properties { background: #e3f2fd; }
.stat-icon.interests { background: #f3e5f5; }
.stat-icon.cities { background: #e8f5e8; }
.stat-icon.neighborhoods { background: #fff3e0; }

.stat-content h3 {
  margin: 0 0 4px 0;
  font-size: 2rem;
  font-weight: 700;
  color: #333;
}

.stat-content p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.dashboard-sections {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.section {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.section-header {
  padding: 20px 24px;
  border-bottom: 1px solid #eee;
}

.section-header h2 {
  margin: 0;
  color: #333;
  font-size: 1.3rem;
  font-weight: 600;
}

.quick-actions {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.action-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 2px solid #f1f3f4;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.3s, background 0.3s;
}

.action-card:hover {
  border-color: #667eea;
  background: #f8f9ff;
}

.action-icon {
  width: 40px;
  height: 40px;
  background: #667eea;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.action-content h3 {
  margin: 0 0 4px 0;
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
}

.action-content p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.activity-list {
  padding: 24px;
}

.loading, .no-activity {
  text-align: center;
  padding: 40px;
  color: #666;
}

.activity-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 16px 0;
  border-bottom: 1px solid #f1f3f4;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-info h4 {
  margin: 0 0 4px 0;
  color: #333;
  font-size: 1rem;
  font-weight: 600;
}

.activity-info p {
  margin: 0 0 4px 0;
  color: #666;
  font-size: 0.9rem;
}

.activity-info small {
  color: #999;
  font-size: 0.8rem;
}

.btn-sm {
  background: #667eea;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-sm:hover {
  background: #5a6fd8;
}

@media (max-width: 768px) {
  .dashboard-sections {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .dashboard-header h1 {
    font-size: 2rem;
  }
  
  .action-card {
    flex-direction: column;
    text-align: center;
  }
}
</style>