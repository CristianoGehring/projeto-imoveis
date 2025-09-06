<template>
  <div class="home">
    <header class="hero">
      <div class="container">
        <div class="hero-brand">
          <h1>🏠 PrimeHomes</h1>
          <p class="tagline">Sua nova casa está aqui</p>
        </div>
        <div class="hero-content">
          <h2>Encontre seu Imóvel dos Sonhos</h2>
          <p>Mais de 1.000 imóveis disponíveis nas melhores localidades</p>
        </div>
      </div>
    </header>

    <section class="filters">
      <div class="container">
        <div class="filter-form">
          <div class="form-row">
            <div class="form-group">
              <label>Tipo</label>
              <select v-model="filters.type">
                <option value="">Todos</option>
                <option value="aluguel">Aluguel</option>
                <option value="compra">Compra</option>
              </select>
            </div>

            <div class="form-group">
              <label>Cidade</label>
              <select v-model="filters.city" @change="onCityChange">
                <option value="">Todas as cidades</option>
                <option v-for="city in cities" :key="city.id" :value="city.id">
                  {{ city.name }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label>Bairro</label>
              <select v-model="filters.neighborhood" :disabled="!filters.city">
                <option value="">Todos os bairros</option>
                <option v-for="neighborhood in neighborhoods" :key="neighborhood.id" :value="neighborhood.id">
                  {{ neighborhood.name }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label>Quartos</label>
              <select v-model="filters.bedrooms">
                <option value="">Qualquer</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>

            <div class="form-group">
              <label>Preço Mín.</label>
              <input v-model="filters.minPrice" type="number" placeholder="R$ 0">
            </div>

            <div class="form-group">
              <label>Preço Máx.</label>
              <input v-model="filters.maxPrice" type="number" placeholder="R$ 0">
            </div>

            <div class="form-group">
              <button @click="searchProperties" :disabled="loading" class="btn-primary">
                {{ loading ? 'Buscando...' : 'Buscar' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="properties">
      <div class="container">
        <div v-if="error" class="error-message">
          <p>{{ error }}</p>
          <button @click="clearError" class="btn-secondary">Fechar</button>
        </div>

        <div v-if="loading" class="loading">
          <div class="loading-spinner"></div>
          <p>Buscando os melhores imóveis para você...</p>
        </div>

        <div v-else-if="properties.length === 0 && !loading" class="no-results">
          <div class="no-results-icon">🏠</div>
          <h3>Nenhum imóvel encontrado</h3>
          <p>Tente ajustar os filtros ou explore outras opções</p>
        </div>

        <div v-else class="properties-grid">
          <div v-for="property in properties" :key="property.id" class="property-card">
            <router-link :to="`/imovel/${property.id}`" class="property-link">
              <div class="property-image">
                <img :src="property.image || '/placeholder-house.jpg'" :alt="property.title">
                <div class="property-type">{{ property.type }}</div>
              </div>
              
              <div class="property-content">
                <h3>{{ property.title }}</h3>
                <p class="property-location">
                  {{ property.neighborhood?.name }}, {{ property.city?.name }}
                </p>
                <p class="property-description">{{ property.description }}</p>
                
                <div class="property-features">
                  <span class="feature">{{ property.bedrooms }} quartos</span>
                </div>
                
                <div class="property-footer">
                  <div class="price">R$ {{ formatPrice(property.price) }}</div>
                </div>
              </div>
            </router-link>
            <button @click="showInterestModal(property)" class="btn-interest">
              Tenho Interesse
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="site-footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-brand">
            <h3>🏠 PrimeHomes</h3>
            <p>Conectando pessoas aos seus lares dos sonhos desde 2010</p>
          </div>
          <div class="footer-info">
            <div class="footer-section">
              <h4>Contato</h4>
              <p>📞 (11) 3000-1234</p>
              <p>📧 contato@primehomes.com.br</p>
            </div>
            <div class="footer-section">
              <h4>Horários</h4>
              <p>Segunda à Sexta: 8h às 18h</p>
              <p>Sábado: 9h às 14h</p>
            </div>
            <div class="footer-section">
              <h4>Redes Sociais</h4>
              <p>📱 @primehomes</p>
              <p>🌐 www.primehomes.com.br</p>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 PrimeHomes. Todos os direitos reservados. CRECI: 12345-SP</p>
        </div>
      </div>
    </footer>

    <!-- Modal de Interesse -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h2>💬 Demonstrar Interesse</h2>
          <button @click="closeModal" class="close-btn">&times;</button>
        </div>
        
        <div class="modal-body">
          <div class="property-info">
            <h3>{{ selectedProperty?.title }}</h3>
            <p class="location">📍 {{ selectedProperty?.neighborhood?.name }}, {{ selectedProperty?.city?.name }}</p>
            <p class="price">💰 R$ {{ formatPrice(selectedProperty?.price) }}</p>
          </div>
          
          <div class="form-intro">
            <p><strong>Preencha seus dados</strong> que entraremos em contato em breve!</p>
          </div>

          <form @submit.prevent="submitInterest">
            <div class="form-group">
              <label>Nome completo *</label>
              <input v-model="interestForm.name" type="text" required>
            </div>

            <div class="form-group">
              <label>E-mail *</label>
              <input v-model="interestForm.email" type="email" required>
            </div>

            <div class="form-group">
              <label>Telefone *</label>
              <input v-model="interestForm.phone" type="tel" required>
            </div>

            <div class="form-group">
              <label>Mensagem</label>
              <textarea v-model="interestForm.message" rows="4" 
                placeholder="Deixe uma mensagem (opcional)"></textarea>
            </div>

            <div class="modal-actions">
              <button type="button" @click="closeModal" class="btn-secondary">Cancelar</button>
              <button type="submit" :disabled="submitting" class="btn-primary">
                {{ submitting ? 'Enviando...' : 'Enviar Interesse' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { usePropertiesStore } from '@/stores/properties'

const propertiesStore = usePropertiesStore()

const filters = ref({
  type: '',
  city: '',
  neighborhood: '',
  bedrooms: '',
  minPrice: '',
  maxPrice: ''
})

const showModal = ref(false)
const selectedProperty = ref(null)
const submitting = ref(false)

const interestForm = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
})

// Computed
const properties = computed(() => propertiesStore.properties)
const cities = computed(() => propertiesStore.cities)
const neighborhoods = computed(() => propertiesStore.neighborhoods)
const loading = computed(() => propertiesStore.loading)
const error = computed(() => propertiesStore.error)

// Methods
const searchProperties = async () => {
  await propertiesStore.fetchProperties(filters.value)
}

const onCityChange = async () => {
  filters.value.neighborhood = ''
  if (filters.value.city) {
    await propertiesStore.fetchNeighborhoods(filters.value.city)
  }
}

const showInterestModal = (property) => {
  selectedProperty.value = property
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedProperty.value = null
  interestForm.value = {
    name: '',
    email: '',
    phone: '',
    message: ''
  }
}

const submitInterest = async () => {
  submitting.value = true
  
  try {
    await propertiesStore.submitInterest(selectedProperty.value.id, interestForm.value)
    alert('🎉 Interesse enviado com sucesso!\n\nRecebemos seu contato e nossa equipe entrará em contato em breve.\n\nObrigado!')
    closeModal()
  } catch (error) {
    alert('❌ Ops! Algo deu errado.\n\nTente novamente ou entre em contato conosco diretamente.')
  } finally {
    submitting.value = false
  }
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('pt-BR').format(price)
}

const clearError = () => {
  propertiesStore.clearError()
}

// Lifecycle
onMounted(async () => {
  await Promise.all([
    propertiesStore.fetchProperties(),
    propertiesStore.fetchCities()
  ])
})
</script>

<style scoped>
.home {
  min-height: 100vh;
}

.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20"><defs><pattern id="a" patternUnits="userSpaceOnUse" width="20" height="20"><circle cx="10" cy="10" r="1" fill="%23ffffff" opacity="0.1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23a)"/></svg>');
}

.hero-brand {
  position: relative;
  z-index: 2;
  margin-bottom: 30px;
}

.hero-brand h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  font-weight: 800;
  letter-spacing: -1px;
}

.tagline {
  font-size: 1rem;
  opacity: 0.8;
  font-weight: 300;
  margin: 0;
}

.hero-content {
  position: relative;
  z-index: 2;
}

.hero-content h2 {
  font-size: 2.8rem;
  margin-bottom: 1rem;
  font-weight: 700;
  line-height: 1.2;
}

.hero-content p {
  font-size: 1.3rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 40px;
}

/* Apenas o conteúdo da seção hero mantém limite de largura para melhor legibilidade */
.hero .container {
  max-width: 1400px;
}

.filters {
  background: white;
  padding: 30px 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.form-row {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  align-items: end;
}

.form-group {
  flex: 1;
  min-width: 150px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #333;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #667eea;
}

.btn-primary {
  background: #667eea;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s;
}

.btn-primary:hover:not(:disabled) {
  background: #5a6fd8;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.properties {
  padding: 50px 0;
}

.error-message {
  background: #fee;
  border: 1px solid #fcc;
  color: #c66;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.loading {
  text-align: center;
  padding: 60px;
  color: #666;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto 20px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.no-results {
  text-align: center;
  padding: 60px 40px;
  color: #666;
}

.no-results-icon {
  font-size: 4rem;
  margin-bottom: 20px;
  opacity: 0.3;
}

.no-results h3 {
  margin: 0 0 12px 0;
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
}

.no-results p {
  margin: 0;
  font-size: 1rem;
  opacity: 0.8;
}

.properties-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 25px;
  max-width: none;
}

.property-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;
}

.property-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.15);
}

.property-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.property-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.property-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.property-type {
  position: absolute;
  top: 15px;
  right: 15px;
  background: #667eea;
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
}

.property-content {
  padding: 20px;
}

.property-content h3 {
  margin: 0 0 10px 0;
  font-size: 1.3rem;
  color: #333;
}

.property-location {
  color: #666;
  margin-bottom: 10px;
  font-size: 14px;
}

.property-description {
  color: #666;
  margin-bottom: 15px;
  line-height: 1.5;
}

.property-features {
  margin-bottom: 20px;
}

.feature {
  background: #f8f9fa;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 12px;
  color: #666;
  margin-right: 10px;
}

.property-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 1.4rem;
  font-weight: 700;
  color: #667eea;
}

.btn-interest {
  background: #28a745;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;
  position: absolute;
  bottom: 15px;
  right: 15px;
  z-index: 2;
}

.btn-interest:hover {
  background: #218838;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  margin: 0;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
}

.close-btn:hover {
  color: #666;
}

.modal-body {
  padding: 20px;
}

.property-info {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 25px;
  border: 1px solid #e9ecef;
}

.property-info h3 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 1.2rem;
  font-weight: 600;
}

.property-info .location {
  margin: 8px 0;
  color: #666;
  font-size: 0.95rem;
}

.property-info .price {
  font-weight: 700;
  color: #667eea;
  margin-top: 12px;
  font-size: 1.1rem;
}

.form-intro {
  margin-bottom: 25px;
  padding: 15px;
  background: #e8f2ff;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.form-intro p {
  margin: 0;
  color: #555;
}

.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
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

textarea {
  width: 100%;
  padding: 10px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.3s;
}

textarea:focus {
  outline: none;
  border-color: #667eea;
}

@media (max-width: 768px) {
  .hero-brand h1 {
    font-size: 2rem;
  }
  
  .hero-content h2 {
    font-size: 2rem;
  }
  
  .hero-content p {
    font-size: 1.1rem;
  }
  
  .form-row {
    flex-direction: column;
  }
  
  .form-group {
    min-width: auto;
  }
  
  .properties-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .property-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .modal {
    width: 95%;
    margin: 20px;
  }
}

.site-footer {
  background: #2c3e50;
  color: white;
  padding: 50px 0 20px;
  margin-top: 60px;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 40px;
  margin-bottom: 30px;
}

.footer-brand h3 {
  margin: 0 0 15px 0;
  font-size: 1.8rem;
  font-weight: 700;
  color: #667eea;
}

.footer-brand p {
  margin: 0;
  color: #bbb;
  line-height: 1.5;
}

.footer-info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.footer-section h4 {
  margin: 0 0 15px 0;
  color: #667eea;
  font-size: 1.1rem;
  font-weight: 600;
}

.footer-section p {
  margin: 8px 0;
  color: #bbb;
  font-size: 0.9rem;
}

.footer-bottom {
  border-top: 1px solid #34495e;
  padding-top: 20px;
  text-align: center;
}

.footer-bottom p {
  margin: 0;
  color: #95a5a6;
  font-size: 0.8rem;
}

@media (max-width: 768px) {
  .hero-brand h1 {
    font-size: 2rem;
  }
  
  .hero-content h2 {
    font-size: 2rem;
  }
  
  .hero-content p {
    font-size: 1.1rem;
  }
  
  .form-row {
    flex-direction: column;
  }
  
  .form-group {
    min-width: auto;
  }
  
  .properties-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .property-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .modal {
    width: 95%;
    margin: 20px;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .footer-info {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .container {
    padding: 0 20px;
  }
}
</style>
