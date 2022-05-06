import type { IBoxesData, ISite_config } from '@/api/siteApi'
import { reqSiteBoxes, reqSiteConfig } from '@/api/siteApi'
import type { Ref } from 'vue'
import { ref, watch } from 'vue'
import { OK_CODE } from '@/app/keys'
import { ElMessage } from 'element-plus'
import useSiteSettings from '@/store/hooks/useSiteSettings'

const useSiteConfig = () => {
  const loading = ref(true)
  const siteConfig = ref<Partial<ISite_config>>({})
  const configStore = useSiteSettings()
  reqSiteConfig()
    .then(({ data, msg, code }) => {
      if (code === OK_CODE) {
        ElMessage({
          message: msg,
          type: 'success',
        })
        siteConfig.value = data.site_config
        configStore.load(data.site_config)
      }
    })
    .finally(() => {
      loading.value = false
    })
  return {
    loading,
    siteConfig,
    configStore,
  }
}

export const useSiteBoxes = (userID: Ref<number | undefined>) => {
  console.log(userID.value)
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
  refresh().finally() //异步函数要执行
  return {
    boxes,
    refresh,
  }
}

export default useSiteConfig
