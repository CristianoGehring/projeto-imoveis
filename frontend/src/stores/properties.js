import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mockProperties, mockCities, mockNeighborhoods, simulateApiDelay } from '@/data/mockData'

// =====================================================
// MODO DESENVOLVIMENTO - DADOS SIMULADOS
// =====================================================
// Esta store está usando dados mockados para desenvolvimento.
// Quando implementar o backend, substitua os trechos marcados
// com "MODO DESENVOLVIMENTO" pelo código de produção comentado.
//
// INSTRUÇÕES:
// 1. Descomente o código da seção "CÓDIGO PARA PRODUÇÃO"
// 2. Comente ou remova as seções "MODO DESENVOLVIMENTO"
// 3. Certifique-se que o backend esteja rodando na URL: http://localhost:3000/api
// =====================================================

export const usePropertiesStore = defineStore('properties', () => {
  const properties = ref([])
  const cities = ref([])
  const neighborhoods = ref([])
  const loading = ref(false)
  const error = ref(null)

  const API_BASE_URL = 'http://localhost:3000/api'

  // Getters
  const availableProperties = computed(() => 
    properties.value.filter(property => property.available)
  )

  const getPropertyById = computed(() => 
    (id) => properties.value.find(property => property.id === id)
  )

  // Actions
  async function fetchProperties(filters = {}) {
    loading.value = true
    error.value = null
    
    try {
      // MODO DESENVOLVIMENTO: Usando dados mockados
      // Substituir por: const response = await fetch(`${API_BASE_URL}/properties?${queryParams}`)
      await simulateApiDelay() // Simula delay da API real
      
      let filteredProperties = [...mockProperties]
      
      // Aplicar filtros localmente (mesma lógica que o backend fará)
      if (filters.city) {
        filteredProperties = filteredProperties.filter(p => p.cityId == filters.city)
      }
      if (filters.neighborhood) {
        filteredProperties = filteredProperties.filter(p => p.neighborhoodId == filters.neighborhood)
      }
      if (filters.type) {
        filteredProperties = filteredProperties.filter(p => p.type === filters.type)
      }
      if (filters.minPrice) {
        filteredProperties = filteredProperties.filter(p => p.price >= parseFloat(filters.minPrice))
      }
      if (filters.maxPrice) {
        filteredProperties = filteredProperties.filter(p => p.price <= parseFloat(filters.maxPrice))
      }
      if (filters.bedrooms) {
        filteredProperties = filteredProperties.filter(p => p.bedrooms >= parseInt(filters.bedrooms))
      }
      
      properties.value = filteredProperties
      
      /* CÓDIGO PARA PRODUÇÃO (descomente quando o backend estiver pronto):
      const queryParams = new URLSearchParams()
      if (filters.city) queryParams.append('city', filters.city)
      if (filters.neighborhood) queryParams.append('neighborhood', filters.neighborhood)
      if (filters.type) queryParams.append('type', filters.type)
      if (filters.minPrice) queryParams.append('minPrice', filters.minPrice)
      if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice)
      if (filters.bedrooms) queryParams.append('bedrooms', filters.bedrooms)

      const response = await fetch(`${API_BASE_URL}/properties?${queryParams}`)
      if (!response.ok) throw new Error('Erro ao carregar imóveis')
      
      const data = await response.json()
      properties.value = data.properties || []
      */
    } catch (err) {
      error.value = err.message
      console.error('Erro ao buscar propriedades:', err)
    } finally {
      loading.value = false
    }
  }

  async function fetchCities() {
    try {
      // MODO DESENVOLVIMENTO: Usando dados mockados
      // Substituir por: const response = await fetch(`${API_BASE_URL}/cities`)
      await simulateApiDelay(300)
      cities.value = mockCities
      
      /* CÓDIGO PARA PRODUÇÃO:
      const response = await fetch(`${API_BASE_URL}/cities`)
      if (!response.ok) throw new Error('Erro ao carregar cidades')
      const data = await response.json()
      cities.value = data.cities || []
      */
    } catch (err) {
      console.error('Erro ao buscar cidades:', err)
    }
  }

  async function fetchNeighborhoods(cityId) {
    try {
      // MODO DESENVOLVIMENTO: Usando dados mockados
      // Substituir por: const response = await fetch(`${API_BASE_URL}/neighborhoods?cityId=${cityId}`)
      await simulateApiDelay(200)
      neighborhoods.value = mockNeighborhoods.filter(n => n.cityId == cityId)
      
      /* CÓDIGO PARA PRODUÇÃO:
      const response = await fetch(`${API_BASE_URL}/neighborhoods?cityId=${cityId}`)
      if (!response.ok) throw new Error('Erro ao carregar bairros')
      const data = await response.json()
      neighborhoods.value = data.neighborhoods || []
      */
    } catch (err) {
      console.error('Erro ao buscar bairros:', err)
    }
  }

  async function submitInterest(propertyId, interestData) {
    try {
      // MODO DESENVOLVIMENTO: Simulando envio de interesse
      // Substituir por: const response = await fetch(`${API_BASE_URL}/properties/${propertyId}/interests`, ...)
      await simulateApiDelay(1000)
      
      // Simula sucesso (em produção, verificar response.ok)
      console.log('Interesse enviado:', { propertyId, ...interestData })
      
      return { success: true, message: 'Interesse enviado com sucesso!' }
      
      /* CÓDIGO PARA PRODUÇÃO:
      const response = await fetch(`${API_BASE_URL}/properties/${propertyId}/interests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(interestData)
      })
      
      if (!response.ok) throw new Error('Erro ao enviar interesse')
      return await response.json()
      */
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  function clearError() {
    error.value = null
  }

  return {
    properties,
    cities,
    neighborhoods,
    loading,
    error,
    availableProperties,
    getPropertyById,
    fetchProperties,
    fetchCities,
    fetchNeighborhoods,
    submitInterest,
    clearError
  }
})