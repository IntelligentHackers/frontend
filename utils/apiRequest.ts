// utils/apiRequest.ts
import axios from 'axios'

const baseURL = 'https://gensyncapi.7086cmd.me/api' // ⚠️ 替换成你自己的 API 地址

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