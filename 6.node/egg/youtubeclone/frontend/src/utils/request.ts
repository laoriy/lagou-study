import { useUserStore } from './../stores/user'
import axios from 'axios'

export const request = axios.create({
  baseURL: import.meta.env.VUE_APP_API_BASE_URL,
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    const { storeUser } = useUserStore()
    if (storeUser) {
      config.headers.Authorization = `Bearer ${storeUser.token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  },
)

// 响应拦截器
