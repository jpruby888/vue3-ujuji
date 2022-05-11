import type { AppRouteRaw } from '@/router/types'

const routes: AppRouteRaw[] = [
  {
    path: '/admin',
    name: 'Admin',
    redirect: { name: 'DashBoard' },
    index: 1,
    meta: {
      auth: true,
    },
    component: () => import('@/pages/Admin.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'DashBoard',
        meta: {
          auth: true,
        },
        component: () => import('@/pages/admin/DashBoard.vue'),
      },
    ],
  },
]

export default routes
