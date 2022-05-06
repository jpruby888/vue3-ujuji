import { defineStore } from 'pinia'
import type { ISite_config } from '@/api/siteApi'
import useStorage from '@/hooks/useStorage'

const useSiteSettings = defineStore('site-settings', {
  state: (): Partial<ISite_config> => {
    return {}
  },
  actions: {
    load(val: Partial<ISite_config>) {
      this.$patch({
        ...this.$state,
        ...val,
      })
    },
  },
})

//instance
const instance = useSiteSettings()
const { setItem, getItem } = useStorage()
instance.$subscribe((_, state) => {
  setItem(instance.$id, { ...state })
})
//pinia2
const sData = getItem(instance.$id)
if (sData) {
  instance.$patch({
    ...sData,
  })
}
export default useSiteSettings
