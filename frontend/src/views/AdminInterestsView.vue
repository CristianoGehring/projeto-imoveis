<template>
  <div class="admin-interests">
    <AdminHeader />
    
    <main class="interests-content">
      <div class="container">
        <div class="page-header">
          <div class="header-info">
            <h1>Interesses dos Clientes</h1>
            <p>{{ interests.length }} interesses recebidos</p>
          </div>
        </div>

        <div class="interests-section">
          <div v-if="error" class="error-message">
            <p>{{ error }}</p>
            <button @click="clearError" class="btn-secondary">Fechar</button>
          </div>

          <div v-if="loading" class="loading">
            <p>Carregando interesses...</p>
          </div>

          <div v-else-if="interests.length === 0" class="no-results">
            <div class="empty-state">
              <div class="empty-icon">💌</div>
              <h3>Nenhum interesse recebido</h3>
              <p>Os interesses dos clientes aparecerão aqui</p>
            </div>
          </div>

          <div v-else class="interests-grid">
            <div v-for="interest in interests" :key="interest.id" class="interest-card">
              <div class="interest-header">
                <div class="client-info">
                  <h3>{{ interest.name }}</h3>
                  <div class="contact-info">
                    <span class="email">📧 {{ interest.email }}</span>
                    <span class="phone">📱 {{ interest.phone }}</span>
                  </div>
                </div>
                <div class="interest-date">
                  <small>{{ formatDate(interest.createdAt) }}</small>
                </div>
              </div>

              <div class="property-info">
                <h4>Imóvel de Interesse:</h4>
                <div class="property-details">
                  <div class="property-image">
                    <img :src="interest.property?.image || '/placeholder-house.jpg'" 
                         :alt="interest.property?.title">
                  </div>
                  <div class="property-content">
                    <h5>{{ interest.property?.title }}</h5>
                    <p class="location">
                      {{ interest.property?.neighborhood?.name }}, 
                      {{ interest.property?.city?.name }}
                    </p>
                    <div class="property-features">
                      <span class="price">R$ {{ formatPrice(interest.property?.price) }}</span>
                      <span class="type">{{ interest.property?.type }}</span>
                      <span class="bedrooms">{{ interest.property?.bedrooms }} quartos</span>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="interest.message" class="message-section">
                <h4>Mensagem:</h4>
                <p class="message">{{ interest.message }}</p>
              </div>

              <div class="interest-actions">
                <a :href="`mailto:${interest.email}`" class="btn-action email">
                  📧 Responder por E-mail
                </a>
                <a :href="`tel:${interest.phone}`" class="btn-action phone">
                  📱 Ligar
                </a>
                <a :href="`https://wa.me/55${interest.phone.replace(/\D/g, '')}`" 
                   target="_blank" class="btn-action whatsapp">
                  💬 WhatsApp
                </a>
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
const interests = computed(() => 
  [...adminStore.interests].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
)
const loading = computed(() => adminStore.loading)
const error = computed(() => adminStore.error)

// Methods
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

const formatPrice = (price) => {
  return new Intl.NumberFormat('pt-BR').format(price)
}

const clearError = () => {
  adminStore.clearError()
}

// Lifecycle
onMounted(async () => {
  if (!adminStore.isAuthenticated) {
    router.push('/admin/login')
    return
  }

  await adminStore.fetchInterests()
})
</script>

<style scoped>
.admin-interests {
  min-height: 100vh;
  background: #f8f9fa;
}

.interests-content {
  padding: 30px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-header {
  margin-bottom: 30px;
}

.header-info h1 {
  margin: 0 0 8px 0;
  color: #333;
  font-size: 2rem;
  font-weight: 600;
}

.header-info p {
  margin: 0;
  color: #666;
  font-size: 1rem;
}

.interests-section {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.error-message {
  background: #fee;
  border: 1px solid #fcc;
  color: #c66;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.loading {
  text-align: center;
  padding: 60px;
  color: #666;
}

.empty-state {
  text-align: center;
  padding: 60px 40px;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.empty-state h3 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 1.5rem;
}

.empty-state p {
  margin: 0;
  color: #666;
}

.interests-grid {
  padding: 20px;
  display: grid;
  gap: 20px;
}

.interest-card {
  background: #f8f9fa;
  border: 1px solid #e1e5e9;
  border-radius: 12px;
  padding: 24px;
  transition: box-shadow 0.3s;
}

.interest-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.interest-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e1e5e9;
}

.client-info h3 {
  margin: 0 0 8px 0;
  color: #333;
  font-size: 1.3rem;
  font-weight: 600;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.contact-info span {
  color: #666;
  font-size: 0.9rem;
}

.interest-date small {
  color: #999;
  font-size: 0.8rem;
}

.property-info {
  margin-bottom: 20px;
}

.property-info h4 {
  margin: 0 0 12px 0;
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
}

.property-details {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e1e5e9;
}

.property-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.property-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.property-content h5 {
  margin: 0 0 6px 0;
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
}

.location {
  margin: 0 0 12px 0;
  color: #666;
  font-size: 0.9rem;
}

.property-features {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.property-features span {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.price {
  background: #e3f2fd;
  color: #1976d2;
}

.type {
  background: #e8f5e8;
  color: #388e3c;
}

.bedrooms {
  background: #fff3e0;
  color: #f57c00;
}

.message-section {
  margin-bottom: 20px;
}

.message-section h4 {
  margin: 0 0 8px 0;
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
}

.message {
  margin: 0;
  color: #666;
  line-height: 1.5;
  padding: 12px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e1e5e9;
}

.interest-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn-action {
  padding: 8px 16px;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background 0.3s, transform 0.2s;
  border: none;
  cursor: pointer;
}

.btn-action:hover {
  transform: translateY(-1px);
}

.btn-action.email {
  background: #667eea;
  color: white;
}

.btn-action.email:hover {
  background: #5a6fd8;
}

.btn-action.phone {
  background: #28a745;
  color: white;
}

.btn-action.phone:hover {
  background: #218838;
}

.btn-action.whatsapp {
  background: #25d366;
  color: white;
}

.btn-action.whatsapp:hover {
  background: #128c7e;
}

.btn-secondary {
  background: #6c757d;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-secondary:hover {
  background: #545b62;
}

@media (max-width: 768px) {
  .interest-header {
    flex-direction: column;
    gap: 15px;
  }
  
  .property-details {
    flex-direction: column;
    text-align: center;
  }
  
  .property-image {
    width: 100%;
    height: 120px;
    align-self: center;
  }
  
  .interest-actions {
    flex-direction: column;
  }
  
  .btn-action {
    text-align: center;
  }
  
  .contact-info {
    flex-direction: row;
    gap: 15px;
  }
}
</style>