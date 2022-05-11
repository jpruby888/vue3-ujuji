import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      auth: false,
    },
    component: () => import('@/pages/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      auth: false,
    },
    component: () => import('@/pages/Register.vue'),
  },
  {
    path: '/RetrievePassword',
    name: 'RetrievePassword',
    meta: {
      auth: false,
    },
    component: () => import('@/pages/RetrievePassword.vue'),
  },
]

export default routes
