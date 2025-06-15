import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5001/api', 
  withCredentials: true // لو فيه كوكيز
})

// Automatically attach token (if available)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') // or from context
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
