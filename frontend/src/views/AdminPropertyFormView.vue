<template>
  <div class="admin-property-form">
    <AdminHeader />
    
    <main class="form-content">
      <div class="container">
        <div class="page-header">
          <div class="header-info">
            <h1>{{ isEdit ? 'Editar Imóvel' : 'Cadastrar Novo Imóvel' }}</h1>
            <p>{{ isEdit ? 'Atualize as informações do imóvel' : 'Preencha os dados do novo imóvel' }}</p>
          </div>
          <div class="header-actions">
            <router-link to="/admin/properties" class="btn-secondary">
              ← Voltar
            </router-link>
          </div>
        </div>

        <div class="form-section">
          <form @submit.prevent="handleSubmit" class="property-form">
            <div v-if="error" class="error-message">
              <p>{{ error }}</p>
            </div>

            <div class="form-grid">
              <div class="form-group span-2">
                <label for="title">Título da Propriedade *</label>
                <input
                  id="title"
                  v-model="form.title"
                  type="text"
                  required
                  :disabled="loading"
                  placeholder="Ex: Casa moderna 4 quartos com piscina"
                >
              </div>

              <div class="form-group span-2">
                <label for="description">Descrição Detalhada *</label>
                <textarea
                  id="description"
                  v-model="form.description"
                  required
                  :disabled="loading"
                  rows="4"
                  placeholder="Destaque as principais características, localização, diferenciais e comodidades do imóvel..."
                ></textarea>
              </div>

              <div class="form-group">
                <label for="price">Valor do Imóvel (R$) *</label>
                <input
                  id="price"
                  v-model="form.price"
                  type="number"
                  required
                  :disabled="loading"
                  placeholder="350000"
                  min="0"
                  step="1000"
                >
              </div>

              <div class="form-group">
                <label for="bedrooms">Dormitórios *</label>
                <select
                  id="bedrooms"
                  v-model="form.bedrooms"
                  required
                  :disabled="loading"
                >
                  <option value="">Selecione a quantidade</option>
                  <option value="1">1 dormitório</option>
                  <option value="2">2 dormitórios</option>
                  <option value="3">3 dormitórios</option>
                  <option value="4">4 dormitórios</option>
                  <option value="5">5 dormitórios</option>
                  <option value="6">6+ dormitórios</option>
                </select>
              </div>

              <div class="form-group">
                <label for="type">Finalidade *</label>
                <select
                  id="type"
                  v-model="form.type"
                  required
                  :disabled="loading"
                >
                  <option value="">Selecione a finalidade</option>
                  <option value="aluguel">Para Locação</option>
                  <option value="compra">Para Venda</option>
                </select>
              </div>

              <div class="form-group">
                <label for="available">Disponibilidade</label>
                <select
                  id="available"
                  v-model="form.available"
                  :disabled="loading"
                >
                  <option :value="true">✅ Disponível</option>
                  <option :value="false">❌ Indisponível</option>
                </select>
              </div>

              <div class="form-group">
                <label for="cityId">Cidade *</label>
                <select
                  id="cityId"
                  v-model="form.cityId"
                  required
                  :disabled="loading"
                  @change="onCityChange"
                >
                  <option value="">Selecione uma cidade</option>
                  <option v-for="city in cities" :key="city.id" :value="city.id">
                    {{ city.name }}
                  </option>
                </select>
                <button type="button" @click="showCityModal = true" class="btn-add-option">
                  + Nova Cidade
                </button>
              </div>

              <div class="form-group">
                <label for="neighborhoodId">Bairro *</label>
                <select
                  id="neighborhoodId"
                  v-model="form.neighborhoodId"
                  required
                  :disabled="loading || !form.cityId"
                >
                  <option value="">Selecione um bairro</option>
                  <option v-for="neighborhood in neighborhoods" :key="neighborhood.id" :value="neighborhood.id">
                    {{ neighborhood.name }}
                  </option>
                </select>
                <button type="button" @click="showNeighborhoodModal = true" 
                        :disabled="!form.cityId" class="btn-add-option">
                  + Novo Bairro
                </button>
              </div>

              <div class="form-group span-2">
                <label for="image">URL da Imagem</label>
                <input
                  id="image"
                  v-model="form.image"
                  type="url"
                  :disabled="loading"
                  placeholder="https://exemplo.com/imagem.jpg"
                >
              </div>
            </div>

            <div class="form-actions">
              <router-link to="/admin/properties" class="btn-secondary">
                Cancelar
              </router-link>
              <button type="submit" :disabled="loading" class="btn-primary">
                {{ loading ? 'Salvando...' : (isEdit ? 'Atualizar' : 'Cadastrar') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>

    <!-- City Modal -->
    <div v-if="showCityModal" class="modal-overlay" @click="closeCityModal">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h2>Nova Cidade</h2>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>Nome da Cidade</label>
            <input v-model="newCity.name" type="text" placeholder="Nome da cidade">
          </div>
        </div>
        <div class="modal-actions">
          <button @click="closeCityModal" class="btn-secondary">Cancelar</button>
          <button @click="createCity" :disabled="creatingCity" class="btn-primary">
            {{ creatingCity ? 'Criando...' : 'Criar' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Neighborhood Modal -->
    <div v-if="showNeighborhoodModal" class="modal-overlay" @click="closeNeighborhoodModal">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h2>Novo Bairro</h2>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>Nome do Bairro</label>
            <input v-model="newNeighborhood.name" type="text" placeholder="Nome do bairro">
          </div>
        </div>
        <div class="modal-actions">
          <button @click="closeNeighborhoodModal" class="btn-secondary">Cancelar</button>
          <button @click="createNeighborhood" :disabled="creatingNeighborhood" class="btn-primary">
            {{ creatingNeighborhood ? 'Criando...' : 'Criar' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAdminStore } from '@/stores/admin'
import AdminHeader from '@/components/AdminHeader.vue'

const adminStore = useAdminStore()
const router = useRouter()
const route = useRoute()

const isEdit = computed(() => !!route.params.id)

const form = ref({
  title: '',
  description: '',
  price: '',
  bedrooms: '',
  type: '',
  cityId: '',
  neighborhoodId: '',
  image: '',
  available: true
})

const loading = ref(false)
const error = ref('')
const showCityModal = ref(false)
const showNeighborhoodModal = ref(false)
const creatingCity = ref(false)
const creatingNeighborhood = ref(false)

const newCity = ref({ name: '' })
const newNeighborhood = ref({ name: '' })

// Computed
const cities = computed(() => adminStore.cities)
const neighborhoods = computed(() => adminStore.neighborhoods)

// Methods
const handleSubmit = async () => {
  loading.value = true
  error.value = ''

  try {
    const propertyData = {
      ...form.value,
      price: parseFloat(form.value.price),
      bedrooms: parseInt(form.value.bedrooms),
      cityId: parseInt(form.value.cityId),
      neighborhoodId: parseInt(form.value.neighborhoodId)
    }

    if (isEdit.value) {
      await adminStore.updateProperty(route.params.id, propertyData)
    } else {
      await adminStore.createProperty(propertyData)
    }

    router.push('/admin/properties')
  } catch (err) {
    error.value = err.message || 'Erro ao salvar imóvel'
  } finally {
    loading.value = false
  }
}

const onCityChange = async () => {
  form.value.neighborhoodId = ''
  if (form.value.cityId) {
    await adminStore.fetchNeighborhoods(form.value.cityId)
  }
}

const closeCityModal = () => {
  showCityModal.value = false
  newCity.value = { name: '' }
}

const createCity = async () => {
  if (!newCity.value.name.trim()) return

  creatingCity.value = true
  try {
    const city = await adminStore.createCity(newCity.value)
    form.value.cityId = city.city.id
    closeCityModal()
  } catch (error) {
    console.error('Erro ao criar cidade:', error)
  } finally {
    creatingCity.value = false
  }
}

const closeNeighborhoodModal = () => {
  showNeighborhoodModal.value = false
  newNeighborhood.value = { name: '' }
}

const createNeighborhood = async () => {
  if (!newNeighborhood.value.name.trim() || !form.value.cityId) return

  creatingNeighborhood.value = true
  try {
    const neighborhood = await adminStore.createNeighborhood({
      ...newNeighborhood.value,
      cityId: parseInt(form.value.cityId)
    })
    form.value.neighborhoodId = neighborhood.neighborhood.id
    closeNeighborhoodModal()
  } catch (error) {
    console.error('Erro ao criar bairro:', error)
  } finally {
    creatingNeighborhood.value = false
  }
}

const loadProperty = async () => {
  if (!isEdit.value) return

  try {
    const property = adminStore.properties.find(p => p.id == route.params.id)
    if (property) {
      form.value = {
        title: property.title || '',
        description: property.description || '',
        price: property.price || '',
        bedrooms: property.bedrooms || '',
        type: property.type || '',
        cityId: property.cityId || '',
        neighborhoodId: property.neighborhoodId || '',
        image: property.image || '',
        available: property.available !== false
      }

      if (property.cityId) {
        await adminStore.fetchNeighborhoods(property.cityId)
      }
    }
  } catch (error) {
    console.error('Erro ao carregar imóvel:', error)
  }
}

// Lifecycle
onMounted(async () => {
  if (!adminStore.isAuthenticated) {
    router.push('/admin/login')
    return
  }

  await Promise.all([
    adminStore.fetchCities(),
    adminStore.fetchProperties()
  ])

  await loadProperty()
})
</script>

<style scoped>
.admin-property-form {
  min-height: 100vh;
  background: #f8f9fa;
}

.form-content {
  padding: 30px 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
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

.form-section {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
}

.property-form {
  max-width: none;
}

.error-message {
  background: #fee;
  border: 1px solid #fcc;
  color: #c66;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 30px;
}

.span-2 {
  grid-column: span 2;
}

.form-group {
  position: relative;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
}

.form-group input:disabled,
.form-group select:disabled,
.form-group textarea:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-add-option {
  background: #28a745;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  margin-top: 8px;
  transition: background 0.3s;
}

.btn-add-option:hover:not(:disabled) {
  background: #218838;
}

.btn-add-option:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  padding-top: 30px;
  border-top: 1px solid #eee;
}

.btn-primary {
  background: #667eea;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-primary:hover:not(:disabled) {
  background: #5a6fd8;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: #6c757d;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-secondary:hover {
  background: #545b62;
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

.modal-actions {
  padding: 20px 24px;
  border-top: 1px solid #eee;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .span-2 {
    grid-column: span 1;
  }
  
  .page-header {
    flex-direction: column;
    gap: 20px;
  }
  
  .form-actions {
    flex-direction: column;
  }
}
</style>