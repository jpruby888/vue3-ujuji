import { defineStore } from 'pinia'
import type { ISearch_config } from '@/api/siteApi'

//ts值得的并不是非常完美（在模板中，vue中）其余的地方，我觉得可以写的非常爽
const useSearchConfigStore = defineStore('search-config', {
  state: (): ISearch_config[] => {
    return []
  },
  actions: {
    load(val: ISearch_config[]) {
      this.$patch(val)
    },
  },
})

export default useSearchConfigStore
