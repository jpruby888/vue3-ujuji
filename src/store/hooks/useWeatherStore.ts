import { defineStore } from 'pinia'
import type { IWeatherData } from '@/api/commonApi'
import useStorage from '@/hooks/useStorage'

interface IWeatherStoreType {
  city: string
  data: Partial<IWeatherData>
}

const useWeatherStore = defineStore('weather', {
  state: (): IWeatherStoreType => {
    return {
      city: '西安',
      data: {},
    }
  },
  actions: {
    changeCity(city: string) {
      this.$state.city = city
    },
  },
})

const instance = useWeatherStore()
const { setItem, getItem } = useStorage()
instance.$subscribe((mutation, state) => {
  setItem(instance.$id, { ...state })
})

const init = getItem<Partial<IWeatherStoreType>>(instance.$id)
instance.$patch({
  city: init?.city,
  data: init?.data,
})

export default useWeatherStore
