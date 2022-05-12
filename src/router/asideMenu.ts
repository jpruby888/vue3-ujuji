import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

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
  {
    name: '站点配置',
    routerName: 'SiteConfig',
    icon: 'icon-park-outline:config',
  },
]

const useMenus = () => {
  const route = useRoute()
  const activeIndex = ref(0)
  watch(
    () => route.name,
    (name) => {
      const res = asideMenu.find((item) => item.routerName === name)
      if (res) {
        activeIndex.value = asideMenu.indexOf(res)
      }
    },
    { immediate: true }
  )
  return {
    asideMenu,
    activeIndex,
  }
}

export default useMenus
