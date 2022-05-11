import { defineStore } from 'pinia'
import useStorage from '@/hooks/useStorage'
import type { ILoginResData } from '@/api/userApi'

const useUserStore = defineStore('userStore', {
  state: (): Partial<ILoginResData> => {
    return {
      info: {
        id: -1,
        access_token: '',
        avatar: '',
        email: '',
        role: '',
        username: '',
        vip_expiration: '',
      },
      token: '',
    }
  },
  actions: {
    load(data: Partial<ILoginResData>) {
      this.$patch({ ...this.$state, ...data })
    },
  },
})

const instance = useUserStore()
const { setItem, getItem } = useStorage()
instance.$subscribe((mutation, state) => {
  setItem(instance.$id, { ...state })
})

const init = getItem<Partial<ILoginResData>>(instance.$id)

instance.$patch({ ...init })

export default useUserStore
