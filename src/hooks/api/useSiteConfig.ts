import type { ISite_config } from '@/api/siteApi'
import { reqSiteConfig } from '@/api/siteApi'
import { ref } from 'vue'
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

export default useSiteConfig
