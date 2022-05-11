export interface AdminMenus {
  name: string
  routerName: string
  icon: string
}

const asideMenu: AdminMenus[] = [
  {
    name: '控制首页',
    routerName: 'DashBoard',
    icon: 'icon-park:dashboard-one',
  },
]

export default asideMenu
