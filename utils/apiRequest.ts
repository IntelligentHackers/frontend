// utils/apiRequest.ts
import axios from 'axios'

const baseURL = 'http://172.20.10.4:8000/api' // ⚠️ 替换成你自己的 API 地址

const api = axios.create({
  baseURL,
  timeout: 10000
})

// 可选：自动添加 token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export async function apiRequest<T = any>(url: string, options: object = {}): Promise<T> {
  const response = await api({
    url,
    ...options
  })
  return response.data
}