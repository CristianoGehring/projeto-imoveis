<template>
  <div class="property-detail">
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Carregando detalhes do imóvel...</p>
    </div>

    <div v-else-if="error" class="error-container">
      <div class="error-message">
        <h2>Imóvel não encontrado</h2>
        <p>{{ error }}</p>
        <router-link to="/" class="btn-primary">Voltar à página inicial</router-link>
      </div>
    </div>

    <div v-else-if="property" class="property-content">
      <!-- Galeria de Imagens -->
      <section class="gallery-section">
        <div class="main-image">
          <img :src="selectedImage" :alt="property.title" @click="openLightbox">
          <button class="btn-fullscreen" @click="openLightbox">🔍 Ver em tela cheia</button>
        </div>
        <div class="thumbnail-gallery" v-if="property.images && property.images.length > 1">
          <button
            v-for="(img, index) in property.images"
            :key="index"
            @click="selectedImage = img"
            :class="['thumbnail', { active: selectedImage === img }]"
          >
            <img :src="img" :alt="`${property.title} - Foto ${index + 1}`">
          </button>
        </div>
      </section>

      <!-- Informações Principais -->
      <section class="main-content">
        <div class="container">
          <div class="content-grid">
            <div class="property-info">
              <div class="breadcrumb">
                <router-link to="/">Início</router-link>
                <span>></span>
                <span>{{ property.city?.name }}</span>
                <span>></span>
                <span>{{ property.neighborhood?.name }}</span>
              </div>

              <h1 class="property-title">{{ property.title }}</h1>
              
              <div class="location-info">
                <span class="location">📍 {{ property.neighborhood?.name }}, {{ property.city?.name }}</span>
                <span class="type-badge" :class="property.type">{{ property.type }}</span>
              </div>

              <div class="price-section">
                <div class="price">R$ {{ formatPrice(property.price) }}</div>
                <div class="price-type">{{ property.type === 'aluguel' ? '/mês' : 'à vista' }}</div>
              </div>

              <!-- Características Rápidas -->
              <div class="quick-stats">
                <div class="stat">
                  <span class="icon">🛏️</span>
                  <span class="value">{{ property.bedrooms }}</span>
                  <span class="label">Quartos</span>
                </div>
                <div class="stat" v-if="property.bathrooms">
                  <span class="icon">🚿</span>
                  <span class="value">{{ property.bathrooms }}</span>
                  <span class="label">Banheiros</span>
                </div>
                <div class="stat" v-if="property.area">
                  <span class="icon">📐</span>
                  <span class="value">{{ property.area }}m²</span>
                  <span class="label">Área</span>
                </div>
                <div class="stat" v-if="property.parkingSpaces">
                  <span class="icon">🚗</span>
                  <span class="value">{{ property.parkingSpaces }}</span>
                  <span class="label">Vagas</span>
                </div>
              </div>

              <!-- Descrição -->
              <div class="description-section">
                <h2>Descrição</h2>
                <p>{{ property.description }}</p>
              </div>

              <!-- Características -->
              <div class="features-section" v-if="property.features && property.features.length">
                <h2>Características</h2>
                <div class="features-grid">
                  <span v-for="feature in property.features" :key="feature" class="feature-tag">
                    ✓ {{ feature }}
                  </span>
                </div>
              </div>

              <!-- Localização -->
              <div class="location-section">
                <h2>Localização</h2>
                <div class="map-placeholder">
                  <div class="map-content">
                    <h3>📍 {{ property.neighborhood?.name }}</h3>
                    <p>{{ property.city?.name }}</p>
                    <small>*Mapa interativo será implementado no backend</small>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sidebar de Contato -->
            <div class="contact-sidebar">
              <div class="contact-card">
                <div class="card-header">
                  <h3>Interessado?</h3>
                  <p>Entre em contato conosco</p>
                </div>

                <div class="card-content">
                  <button @click="showInterestModal" class="btn-contact btn-primary">
                    💬 Tenho Interesse
                  </button>

                  <div class="contact-options">
                    <a href="tel:+5511300001234" class="contact-option">
                      <span class="icon">📞</span>
                      <span>Ligar Agora</span>
                    </a>
                    <a href="https://wa.me/5511300001234" target="_blank" class="contact-option">
                      <span class="icon">💬</span>
                      <span>WhatsApp</span>
                    </a>
                    <a href="mailto:contato@primehomes.com.br" class="contact-option">
                      <span class="icon">✉️</span>
                      <span>E-mail</span>
                    </a>
                  </div>

                  <div class="agent-info">
                    <div class="agent-avatar">👨‍💼</div>
                    <div class="agent-details">
                      <strong>Corretor Responsável</strong>
                      <p>Carlos Silva - CRECI 12345-SP</p>
                      <small>Especialista em {{ property.neighborhood?.name }}</small>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Imóveis Similares -->
              <div class="similar-properties" v-if="similarProperties.length">
                <h3>Imóveis Similares</h3>
                <div class="similar-list">
                  <router-link
                    v-for="similar in similarProperties.slice(0, 3)"
                    :key="similar.id"
                    :to="`/imovel/${similar.id}`"
                    class="similar-item"
                  >
                    <img :src="similar.image" :alt="similar.title">
                    <div class="similar-info">
                      <h4>{{ similar.title }}</h4>
                      <p>R$ {{ formatPrice(similar.price) }}</p>
                      <small>{{ similar.neighborhood?.name }}</small>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Modal de Interesse -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h2>💬 Demonstrar Interesse</h2>
          <button @click="closeModal" class="close-btn">&times;</button>
        </div>
        
        <div class="modal-body">
          <div class="property-info-mini">
            <h3>{{ property?.title }}</h3>
            <p class="location">📍 {{ property?.neighborhood?.name }}, {{ property?.city?.name }}</p>
            <p class="price">💰 R$ {{ formatPrice(property?.price) }}</p>
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

    <!-- Lightbox -->
    <div v-if="showLightbox" class="lightbox-overlay" @click="closeLightbox">
      <div class="lightbox-content">
        <button @click="closeLightbox" class="lightbox-close">&times;</button>
        <img :src="selectedImage" :alt="property?.title">
        <div class="lightbox-nav" v-if="property?.images && property.images.length > 1">
          <button @click="previousImage" class="nav-btn">‹</button>
          <button @click="nextImage" class="nav-btn">›</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePropertiesStore } from '@/stores/properties'

const route = useRoute()
const router = useRouter()
const propertiesStore = usePropertiesStore()

const property = ref(null)
const loading = ref(true)
const error = ref(null)
const selectedImage = ref('')
const showModal = ref(false)
const showLightbox = ref(false)
const submitting = ref(false)

const interestForm = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
})

// Computed
const similarProperties = computed(() => {
  if (!property.value) return []
  
  return propertiesStore.properties
    .filter(p => 
      p.id !== property.value.id && 
      (p.cityId === property.value.cityId || p.type === property.value.type)
    )
    .slice(0, 3)
})

// Methods
const formatPrice = (price) => {
  return new Intl.NumberFormat('pt-BR').format(price)
}

const loadProperty = async () => {
  loading.value = true
  error.value = null
  
  try {
    // Garantir que as propriedades foram carregadas
    if (propertiesStore.properties.length === 0) {
      await propertiesStore.fetchProperties()
    }
    
    const propertyId = parseInt(route.params.id)
    const foundProperty = propertiesStore.properties.find(p => p.id === propertyId)
    
    if (foundProperty) {
      property.value = foundProperty
      selectedImage.value = foundProperty.image || foundProperty.images?.[0] || ''
    } else {
      error.value = 'Imóvel não encontrado'
    }
  } catch (err) {
    error.value = 'Erro ao carregar imóvel'
    console.error('Erro ao buscar propriedade:', err)
  } finally {
    loading.value = false
  }
}

const showInterestModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
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
    await propertiesStore.submitInterest(property.value.id, interestForm.value)
    alert('🎉 Interesse enviado com sucesso!\n\nRecebemos seu contato e nossa equipe entrará em contato em breve.\n\nObrigado!')
    closeModal()
  } catch (error) {
    alert('❌ Ops! Algo deu errado.\n\nTente novamente ou entre em contato conosco diretamente.')
  } finally {
    submitting.value = false
  }
}

const openLightbox = () => {
  showLightbox.value = true
}

const closeLightbox = () => {
  showLightbox.value = false
}

const previousImage = () => {
  if (!property.value?.images) return
  const currentIndex = property.value.images.indexOf(selectedImage.value)
  const newIndex = currentIndex === 0 ? property.value.images.length - 1 : currentIndex - 1
  selectedImage.value = property.value.images[newIndex]
}

const nextImage = () => {
  if (!property.value?.images) return
  const currentIndex = property.value.images.indexOf(selectedImage.value)
  const newIndex = currentIndex === property.value.images.length - 1 ? 0 : currentIndex + 1
  selectedImage.value = property.value.images[newIndex]
}

// Watchers
watch(() => route.params.id, loadProperty)

// Lifecycle
onMounted(loadProperty)
</script>

<style scoped>
.property-detail {
  min-height: 100vh;
  background: #f8f9fa;
}

.loading-container, .error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  margin-bottom: 20px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.gallery-section {
  background: white;
  padding: 0;
  position: relative;
}

.main-image {
  position: relative;
  height: 500px;
  overflow: hidden;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s;
}

.main-image:hover img {
  transform: scale(1.02);
}

.btn-fullscreen {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0,0,0,0.7);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.3s;
}

.btn-fullscreen:hover {
  background: rgba(0,0,0,0.9);
}

.thumbnail-gallery {
  display: flex;
  gap: 10px;
  padding: 20px;
  overflow-x: auto;
  background: white;
}

.thumbnail {
  flex-shrink: 0;
  width: 80px;
  height: 60px;
  border: 2px solid transparent;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.3s;
}

.thumbnail.active {
  border-color: #667eea;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.main-content {
  padding: 40px 0;
}

.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 40px;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 40px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  font-size: 0.9rem;
  color: #666;
}

.breadcrumb a {
  color: #667eea;
  text-decoration: none;
}

.property-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin: 0 0 15px 0;
  line-height: 1.2;
}

.location-info {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.location {
  color: #666;
  font-size: 1.1rem;
}

.type-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
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

.price-section {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 30px;
}

.price {
  font-size: 3rem;
  font-weight: 800;
  color: #667eea;
  line-height: 1;
}

.price-type {
  font-size: 1.2rem;
  color: #666;
}

.quick-stats {
  display: flex;
  gap: 30px;
  margin-bottom: 40px;
  padding: 25px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 5px;
}

.stat .icon {
  font-size: 1.5rem;
}

.stat .value {
  font-size: 1.3rem;
  font-weight: 700;
  color: #333;
}

.stat .label {
  font-size: 0.9rem;
  color: #666;
}

.description-section, .features-section, .location-section {
  margin-bottom: 40px;
}

.description-section h2, .features-section h2, .location-section h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
}

.description-section p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}

.feature-tag {
  background: #f8f9fa;
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #555;
  border-left: 3px solid #667eea;
}

.map-placeholder {
  background: #e9ecef;
  border-radius: 12px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.map-content {
  text-align: center;
  color: #666;
}

.contact-sidebar {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.contact-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  overflow: hidden;
  position: sticky;
  top: 20px;
}

.card-header {
  background: #667eea;
  color: white;
  padding: 20px;
  text-align: center;
}

.card-header h3 {
  margin: 0 0 5px 0;
  font-size: 1.3rem;
}

.card-header p {
  margin: 0;
  opacity: 0.9;
}

.card-content {
  padding: 25px;
}

.btn-contact {
  width: 100%;
  padding: 15px;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 20px;
}

.contact-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 25px;
}

.contact-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  text-decoration: none;
  color: #333;
  transition: background 0.3s, border-color 0.3s;
}

.contact-option:hover {
  background: #f8f9fa;
  border-color: #667eea;
}

.agent-info {
  display: flex;
  gap: 15px;
  padding-top: 20px;
  border-top: 1px solid #e1e5e9;
}

.agent-avatar {
  width: 50px;
  height: 50px;
  background: #667eea;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.agent-details strong {
  color: #333;
  font-size: 0.9rem;
}

.agent-details p {
  margin: 5px 0;
  color: #666;
  font-size: 0.8rem;
}

.agent-details small {
  color: #999;
  font-size: 0.75rem;
}

.similar-properties {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.similar-properties h3 {
  margin: 0 0 15px 0;
  font-size: 1.2rem;
  color: #333;
}

.similar-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.similar-item {
  display: flex;
  gap: 12px;
  padding: 10px;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: background 0.3s;
}

.similar-item:hover {
  background: #f8f9fa;
}

.similar-item img {
  width: 60px;
  height: 45px;
  object-fit: cover;
  border-radius: 6px;
}

.similar-info h4 {
  margin: 0 0 5px 0;
  font-size: 0.9rem;
  color: #333;
}

.similar-info p {
  margin: 0 0 3px 0;
  font-weight: 600;
  color: #667eea;
  font-size: 0.9rem;
}

.similar-info small {
  color: #666;
  font-size: 0.8rem;
}

/* Modal Styles */
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

.modal-body {
  padding: 20px;
}

.property-info-mini {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.form-intro {
  margin-bottom: 25px;
  padding: 15px;
  background: #e8f2ff;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

.form-group input,
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
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
}

.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
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

.btn-secondary {
  background: #6c757d;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

/* Lightbox Styles */
.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.lightbox-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
}

.lightbox-content img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.lightbox-close {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 30px;
  cursor: pointer;
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
}

.nav-btn {
  background: rgba(0,0,0,0.5);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  transition: background 0.3s;
}

.nav-btn:hover {
  background: rgba(0,0,0,0.8);
}

/* Responsive */
@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .container {
    padding: 0 20px;
  }
  
  .property-title {
    font-size: 2rem;
  }
  
  .price {
    font-size: 2.5rem;
  }
  
  .quick-stats {
    gap: 15px;
    padding: 20px;
  }
  
  .main-image {
    height: 250px;
  }
  
  .thumbnail-gallery {
    padding: 15px;
  }
  
  .contact-sidebar {
    order: -1;
  }
  
  .contact-card {
    position: static;
  }
}
</style>