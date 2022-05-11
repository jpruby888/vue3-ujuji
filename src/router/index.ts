import { createRouter, createWebHashHistory } from 'vue-router'
import type { AppRouteRaw } from '@/router/types'
import useStorage from '@/hooks/useStorage'
import type { ILoginResData } from '@/api/userApi'
import { USER_KEY } from '@/store/hooks/useUserStore'
import { ElMessage } from 'element-plus'

const modules = import.meta.globEager('./modules/*.ts')
const allRoutes: AppRouteRaw[] = []

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  allRoutes.push(...modList)
})
//sort
allRoutes.sort((item1, item2) => {
  return item2.index - item1.index
})
console.log(allRoutes)
const router = createRouter({
  history: createWebHashHistory(),
  routes: allRoutes,
})

// hooks 路由卫士
const { getItem } = useStorage()
router.beforeEach((to, from, next) => {
  const accessToken = getItem<ILoginResData>(USER_KEY)?.info?.access_token
  // 如果有auth要求， 并且没有写道 token认证 直接跳转到登录也买你
  if (to.meta.auth && !accessToken) {
    ElMessage.error('请先登录')
    router.push({ name: 'Login' }).then()
  }
  next()
})
router.afterEach(() => {})
export default router
