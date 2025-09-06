import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

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
    } catch (err) {
      error.value = err.message
      console.error('Erro ao buscar propriedades:', err)
    } finally {
      loading.value = false
    }
  }

  async function fetchCities() {
    try {
      const response = await fetch(`${API_BASE_URL}/cities`)
      if (!response.ok) throw new Error('Erro ao carregar cidades')
      
      const data = await response.json()
      cities.value = data.cities || []
    } catch (err) {
      console.error('Erro ao buscar cidades:', err)
    }
  }

  async function fetchNeighborhoods(cityId) {
    try {
      const response = await fetch(`${API_BASE_URL}/neighborhoods?cityId=${cityId}`)
      if (!response.ok) throw new Error('Erro ao carregar bairros')
      
      const data = await response.json()
      neighborhoods.value = data.neighborhoods || []
    } catch (err) {
      console.error('Erro ao buscar bairros:', err)
    }
  }

  async function submitInterest(propertyId, interestData) {
    try {
      const response = await fetch(`${API_BASE_URL}/properties/${propertyId}/interests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(interestData)
      })
      
      if (!response.ok) throw new Error('Erro ao enviar interesse')
      
      return await response.json()
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