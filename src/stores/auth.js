import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import router from '../router'

const API_URL = __API_URL__;

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(sessionStorage.getItem('user')))
  const token = ref(sessionStorage.getItem('token'))

  if (token.value) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
  }

  const isAuthenticated = computed(() => !!token.value)

  async function login(credentials) {
    try {
      const { data } = await axios.post(`${API_URL}auth/login`, credentials)
      user.value = data.user
      token.value = data.token
      sessionStorage.setItem('user', JSON.stringify(data.user))
      sessionStorage.setItem('token', data.token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
      router.push('/admin')
    } catch (error) {
      console.error("Login gagal:", error)
      alert("Login gagal! Periksa kembali username dan password Anda.")
    }
  }

  function logout() {
    user.value = null
    token.value = null
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    router.push('/login')
  }

  return { user, isAuthenticated, login, logout }
})
