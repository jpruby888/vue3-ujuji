import type { IBoxesData, ISite_config, ISearch_config } from '@/api/siteApi'
import { reqSiteBoxes, reqSiteConfig } from '@/api/siteApi'
import type { Ref } from 'vue'
import { ref, watch } from 'vue'
import { OK_CODE } from '@/app/keys'
import { ElMessage } from 'element-plus'
import useSiteSettingsStore from '@/store/hooks/useSiteSettingsStore'
import useSearchConfigStore from '@/store/hooks/useSearchConfigStore'
import useHeadLink from '@/hooks/useHeadLink'

const useSiteConfig = () => {
  const loading = ref(true)
  const siteConfig = ref<Partial<ISite_config>>({})
  const siteSearch = ref<Partial<ISearch_config[]>>([])
  const configStore = useSiteSettingsStore()
  const searchStore = useSearchConfigStore()
  reqSiteConfig()
    .then(({ data, msg, code }) => {
      if (code === OK_CODE) {
        ElMessage({
          message: msg,
          type: 'success',
        })
        siteConfig.value = data.site_config
        configStore.load(data.site_config)
        siteSearch.value = data.search_config
        searchStore.load(data.search_config)
        useHeadLink('iconfont', 'link', configStore.$state.icon_url || '')
      }
    })
    .finally(() => {
      loading.value = false
    })
  return {
    loading,
    siteConfig,
    configStore,
    searchStore,
    siteSearch,
  }
}

export const useSiteBoxes = (userID: Ref<number | undefined>) => {
  const boxLoading = ref(true)
  const boxes = ref<IBoxesData[]>([])
  watch(userID, async () => {
    console.log('userId', userID.value)
    await refresh()
  })

  const refresh = async () => {
    if (!userID.value || userID.value < 0) return
    let { data, code, msg } = await reqSiteBoxes(userID.value)
    if (code === OK_CODE) {
      ElMessage.success(msg)
      boxes.value = data
    }
  }
  refresh().finally(() => {
    boxLoading.value = false
  }) //异步函数要执行
  return {
    boxes,
    refresh,
    boxLoading,
  }
}

export default useSiteConfig
