<template>
  <div class="admin-login">
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <div class="login-brand">
            <h1>🏠 PrimeHomes</h1>
            <span class="admin-badge">ADMIN</span>
          </div>
          <h2>Painel Administrativo</h2>
          <p>Faça login para acessar o sistema</p>
        </div>

        <form @submit.prevent="handleLogin" class="login-form">
          <div v-if="error" class="error-message">
            <p>{{ error }}</p>
          </div>

          <div class="form-group">
            <label for="email">E-mail</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              :disabled="loading"
              placeholder="seu.email@exemplo.com"
            >
          </div>

          <div class="form-group">
            <label for="password">Senha</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              :disabled="loading"
              placeholder="Sua senha"
            >
          </div>

          <button type="submit" :disabled="loading" class="btn-login">
            {{ loading ? 'Entrando...' : 'Entrar' }}
          </button>
        </form>

        <div class="login-footer">
          <p>
            <router-link to="/">← Voltar ao site</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '@/stores/admin'

const adminStore = useAdminStore()
const router = useRouter()

const form = ref({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    await adminStore.login(form.value.email, form.value.password)
    router.push('/admin/dashboard')
  } catch (err) {
    error.value = err.message || 'Erro ao fazer login'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  // Se já está logado, redireciona para dashboard
  if (adminStore.isAuthenticated) {
    router.push('/admin/dashboard')
  }
})
</script>

<style scoped>
.admin-login {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.login-container {
  width: 100%;
  max-width: 400px;
}

.login-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.login-header {
  padding: 40px 30px 20px;
  text-align: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.login-brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;
}

.login-brand h1 {
  margin: 0;
  color: #667eea;
  font-size: 1.8rem;
  font-weight: 700;
}

.admin-badge {
  background: #dc3545;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 1px;
}

.login-header h2 {
  margin: 0 0 8px 0;
  color: #333;
  font-size: 1.4rem;
  font-weight: 600;
}

.login-header p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.login-form {
  padding: 30px;
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

.form-group input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s, box-shadow 0.3s;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-group input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-login {
  width: 100%;
  background: #667eea;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

.btn-login:hover:not(:disabled) {
  background: #5a6fd8;
  transform: translateY(-1px);
}

.btn-login:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.error-message {
  background: #fee;
  border: 1px solid #fcc;
  color: #c66;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
}

.error-message p {
  margin: 0;
  font-size: 14px;
}

.login-footer {
  padding: 20px 30px 30px;
  text-align: center;
  border-top: 1px solid #eee;
}

.login-footer a {
  color: #667eea;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
}

.login-footer a:hover {
  color: #5a6fd8;
  text-decoration: underline;
}

@media (max-width: 480px) {
  .login-card {
    margin: 0 10px;
  }
  
  .login-header {
    padding: 30px 20px 15px;
  }
  
  .login-form {
    padding: 20px;
  }
  
  .login-footer {
    padding: 15px 20px 20px;
  }
}
</style>