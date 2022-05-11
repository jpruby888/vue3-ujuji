import axios from 'axios'
import { NO_PERMISSION, OK_CODE } from '@/app/keys'
import router from '@/router'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
})

//拦截器
request.interceptors.request.use((config) => {
  config = config || {}
  // try {
  //   const user = JSON.parse(localStorage.getItem(KEY_USER_ID) || '') as UserInfo
  //   if (user.token) {
  //     config.headers!['Authorization'] = `Bearer ${user.token}`
  //   }
  // } catch (e) {}
  return config
})

//响应拦截器
request.interceptors.response.use(
  (resp) => {
    const { code, msg } = resp.data || {}
    if (code !== OK_CODE) {
      // return Promise.resolve(resp)
      return Promise.reject(msg)
    }
    if (code === NO_PERMISSION) {
      router.push({ name: 'login' }).then()
      return Promise.reject(msg)
    }
    return Promise.resolve(resp)
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default request
