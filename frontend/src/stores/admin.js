import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAdminStore = defineStore('admin', () => {
  const properties = ref([])
  const interests = ref([])
  const cities = ref([])
  const neighborhoods = ref([])
  const loading = ref(false)
  const error = ref(null)
  const isAuthenticated = ref(false)
  const currentUser = ref(null)

  const API_BASE_URL = 'http://localhost:3000/api/admin'

  // Getters
  const totalProperties = computed(() => properties.value.length)
  const totalInterests = computed(() => interests.value.length)

  // Auth Actions
  async function login(email, password) {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      
      if (!response.ok) throw new Error('Credenciais inválidas')
      
      const data = await response.json()
      localStorage.setItem('admin_token', data.token)
      localStorage.setItem('admin_user', JSON.stringify(data.user))
      
      isAuthenticated.value = true
      currentUser.value = data.user
      
      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    isAuthenticated.value = false
    currentUser.value = null
  }

  function checkAuth() {
    const token = localStorage.getItem('admin_token')
    const user = localStorage.getItem('admin_user')
    
    if (token && user) {
      isAuthenticated.value = true
      currentUser.value = JSON.parse(user)
    }
  }

  // Properties Actions
  async function fetchProperties() {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(`${API_BASE_URL}/properties`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      })
      
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

  async function createProperty(propertyData) {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(`${API_BASE_URL}/properties`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify(propertyData)
      })
      
      if (!response.ok) throw new Error('Erro ao criar imóvel')
      
      const data = await response.json()
      properties.value.push(data.property)
      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateProperty(id, propertyData) {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify(propertyData)
      })
      
      if (!response.ok) throw new Error('Erro ao atualizar imóvel')
      
      const data = await response.json()
      const index = properties.value.findIndex(p => p.id === id)
      if (index !== -1) {
        properties.value[index] = data.property
      }
      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteProperty(id) {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      })
      
      if (!response.ok) throw new Error('Erro ao excluir imóvel')
      
      properties.value = properties.value.filter(p => p.id !== id)
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Cities Actions
  async function fetchCities() {
    try {
      const response = await fetch(`${API_BASE_URL}/cities`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      })
      if (!response.ok) throw new Error('Erro ao carregar cidades')
      
      const data = await response.json()
      cities.value = data.cities || []
    } catch (err) {
      console.error('Erro ao buscar cidades:', err)
    }
  }

  async function createCity(cityData) {
    try {
      const response = await fetch(`${API_BASE_URL}/cities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify(cityData)
      })
      
      if (!response.ok) throw new Error('Erro ao criar cidade')
      
      const data = await response.json()
      cities.value.push(data.city)
      return data
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  // Neighborhoods Actions
  async function fetchNeighborhoods(cityId) {
    try {
      const response = await fetch(`${API_BASE_URL}/neighborhoods?cityId=${cityId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      })
      if (!response.ok) throw new Error('Erro ao carregar bairros')
      
      const data = await response.json()
      neighborhoods.value = data.neighborhoods || []
    } catch (err) {
      console.error('Erro ao buscar bairros:', err)
    }
  }

  async function createNeighborhood(neighborhoodData) {
    try {
      const response = await fetch(`${API_BASE_URL}/neighborhoods`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify(neighborhoodData)
      })
      
      if (!response.ok) throw new Error('Erro ao criar bairro')
      
      const data = await response.json()
      neighborhoods.value.push(data.neighborhood)
      return data
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  // Interests Actions
  async function fetchInterests() {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(`${API_BASE_URL}/interests`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      })
      
      if (!response.ok) throw new Error('Erro ao carregar interesses')
      
      const data = await response.json()
      interests.value = data.interests || []
    } catch (err) {
      error.value = err.message
      console.error('Erro ao buscar interesses:', err)
    } finally {
      loading.value = false
    }
  }

  function clearError() {
    error.value = null
  }

  return {
    // State
    properties,
    interests,
    cities,
    neighborhoods,
    loading,
    error,
    isAuthenticated,
    currentUser,
    
    // Getters
    totalProperties,
    totalInterests,
    
    // Auth Actions
    login,
    logout,
    checkAuth,
    
    // Properties Actions
    fetchProperties,
    createProperty,
    updateProperty,
    deleteProperty,
    
    // Cities Actions
    fetchCities,
    createCity,
    
    // Neighborhoods Actions
    fetchNeighborhoods,
    createNeighborhood,
    
    // Interests Actions
    fetchInterests,
    
    // Utils
    clearError
  }
})