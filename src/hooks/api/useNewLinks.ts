import type { INewLinksData } from '@/api/commonApi'
import { reqNewLinks } from '@/api/commonApi'
import { OK_CODE } from '@/app/keys'
import type { Ref } from 'vue'
import { ref } from 'vue'

const useNewLinks = (userId: Ref<number>) => {
  const newLinks = ref<INewLinksData[]>([])
  const loading = ref(false)
  const refresh = () => {
    loading.value = true
    reqNewLinks(userId.value)
      .then(({ code, data }) => {
        if (code === OK_CODE) {
          newLinks.value = data
        }
      })
      .finally(() => {
        loading.value = false
      })
  }

  return {
    refresh,
    loading,
    newLinks,
  }
}

export default useNewLinks
