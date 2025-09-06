<template>
  <div class="admin-properties">
    <AdminHeader />
    
    <main class="properties-content">
      <div class="container">
        <div class="page-header">
          <div class="header-info">
            <h1>Gerenciar Imóveis</h1>
            <p>{{ properties.length }} imóveis cadastrados</p>
          </div>
          <div class="header-actions">
            <router-link to="/admin/properties/new" class="btn-primary">
              + Novo Imóvel
            </router-link>
          </div>
        </div>

        <div class="properties-section">
          <div v-if="error" class="error-message">
            <p>{{ error }}</p>
            <button @click="clearError" class="btn-secondary">Fechar</button>
          </div>

          <div v-if="loading" class="loading">
            <p>Carregando imóveis...</p>
          </div>

          <div v-else-if="properties.length === 0" class="no-results">
            <div class="empty-state">
              <div class="empty-icon">🏠</div>
              <h3>Nenhum imóvel cadastrado</h3>
              <p>Comece adicionando seu primeiro imóvel</p>
              <router-link to="/admin/properties/new" class="btn-primary">
                Cadastrar Imóvel
              </router-link>
            </div>
          </div>

          <div v-else class="properties-table-container">
            <table class="properties-table">
              <thead>
                <tr>
                  <th>Imóvel</th>
                  <th>Localização</th>
                  <th>Tipo</th>
                  <th>Preço</th>
                  <th>Quartos</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="property in properties" :key="property.id">
                  <td>
                    <div class="property-info">
                      <div class="property-image">
                        <img :src="property.image || '/placeholder-house.jpg'" 
                             :alt="property.title">
                      </div>
                      <div class="property-details">
                        <h4>{{ property.title }}</h4>
                        <p>{{ truncateDescription(property.description) }}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="location">
                      <strong>{{ property.city?.name }}</strong><br>
                      {{ property.neighborhood?.name }}
                    </div>
                  </td>
                  <td>
                    <span class="type-badge" :class="property.type">
                      {{ property.type }}
                    </span>
                  </td>
                  <td>
                    <strong>R$ {{ formatPrice(property.price) }}</strong>
                  </td>
                  <td>{{ property.bedrooms }}</td>
                  <td>
                    <span class="status-badge" 
                          :class="property.available ? 'available' : 'unavailable'">
                      {{ property.available ? 'Disponível' : 'Indisponível' }}
                    </span>
                  </td>
                  <td>
                    <div class="actions">
                      <button @click="editProperty(property)" class="btn-icon edit">
                        ✏️
                      </button>
                      <button @click="deletePropertyConfirm(property)" 
                              class="btn-icon delete">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay" @click="closeDeleteModal">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h2>Confirmar Exclusão</h2>
        </div>
        <div class="modal-body">
          <p>Tem certeza que deseja excluir o imóvel:</p>
          <strong>{{ propertyToDelete?.title }}</strong>
          <p class="warning">Esta ação não pode ser desfeita.</p>
        </div>
        <div class="modal-actions">
          <button @click="closeDeleteModal" class="btn-secondary">
            Cancelar
          </button>
          <button @click="confirmDelete" :disabled="deleting" class="btn-danger">
            {{ deleting ? 'Excluindo...' : 'Excluir' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '@/stores/admin'
import AdminHeader from '@/components/AdminHeader.vue'

const adminStore = useAdminStore()
const router = useRouter()

const showDeleteModal = ref(false)
const propertyToDelete = ref(null)
const deleting = ref(false)

// Computed
const properties = computed(() => adminStore.properties)
const loading = computed(() => adminStore.loading)
const error = computed(() => adminStore.error)

// Methods
const editProperty = (property) => {
  router.push(`/admin/properties/${property.id}/edit`)
}

const deletePropertyConfirm = (property) => {
  propertyToDelete.value = property
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  propertyToDelete.value = null
}

const confirmDelete = async () => {
  if (!propertyToDelete.value) return
  
  deleting.value = true
  try {
    await adminStore.deleteProperty(propertyToDelete.value.id)
    closeDeleteModal()
  } catch (error) {
    console.error('Erro ao excluir imóvel:', error)
  } finally {
    deleting.value = false
  }
}

const truncateDescription = (text) => {
  if (!text) return ''
  return text.length > 100 ? text.substring(0, 100) + '...' : text
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

  await adminStore.fetchProperties()
})
</script>

<style scoped>
.admin-properties {
  min-height: 100vh;
  background: #f8f9fa;
}

.properties-content {
  padding: 30px 0;
}

.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 40px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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

.btn-primary {
  background: #667eea;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.3s;
}

.btn-primary:hover {
  background: #5a6fd8;
}

.properties-section {
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
  margin: 0 0 30px 0;
  color: #666;
}

.properties-table-container {
  overflow-x: auto;
}

.properties-table {
  width: 100%;
  border-collapse: collapse;
}

.properties-table th {
  background: #f8f9fa;
  padding: 16px;
  text-align: left;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #e1e5e9;
}

.properties-table td {
  padding: 16px;
  border-bottom: 1px solid #f1f3f4;
  vertical-align: top;
}

.properties-table tr:hover {
  background: #f8f9fa;
}

.property-info {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.property-image {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.property-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.property-details h4 {
  margin: 0 0 4px 0;
  font-size: 1rem;
  color: #333;
}

.property-details p {
  margin: 0;
  color: #666;
  font-size: 0.8rem;
  line-height: 1.4;
}

.location strong {
  color: #333;
  font-size: 0.9rem;
}

.location {
  font-size: 0.8rem;
  color: #666;
  line-height: 1.4;
}

.type-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
}

.type-badge.aluguel {
  background: #e3f2fd;
  color: #1976d2;
}

.type-badge.compra {
  background: #e8f5e8;
  color: #388e3c;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.status-badge.available {
  background: #e8f5e8;
  color: #388e3c;
}

.status-badge.unavailable {
  background: #ffebee;
  color: #d32f2f;
}

.actions {
  display: flex;
  gap: 8px;
}

.btn-icon {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}

.btn-icon.edit {
  background: #e3f2fd;
}

.btn-icon.edit:hover {
  background: #bbdefb;
}

.btn-icon.delete {
  background: #ffebee;
}

.btn-icon.delete:hover {
  background: #ffcdd2;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
}

.modal-header {
  padding: 20px 24px;
  border-bottom: 1px solid #eee;
}

.modal-header h2 {
  margin: 0;
  color: #333;
  font-size: 1.3rem;
}

.modal-body {
  padding: 24px;
}

.modal-body p {
  margin: 0 0 10px 0;
  color: #666;
}

.modal-body strong {
  color: #333;
}

.warning {
  color: #d32f2f !important;
  font-size: 0.9rem;
  margin-top: 15px !important;
}

.modal-actions {
  padding: 20px 24px;
  border-top: 1px solid #eee;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.btn-secondary {
  background: #6c757d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-secondary:hover {
  background: #545b62;
}

.btn-danger {
  background: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-danger:hover:not(:disabled) {
  background: #c82333;
}

.btn-danger:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    gap: 20px;
  }
  
  .properties-table-container {
    font-size: 0.9rem;
  }
  
  .property-info {
    flex-direction: column;
    gap: 8px;
  }
  
  .property-image {
    width: 50px;
    height: 50px;
  }
  
  .actions {
    flex-direction: column;
  }
  
  .container {
    padding: 0 20px;
  }
}
</style>