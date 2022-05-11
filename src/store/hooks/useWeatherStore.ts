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
  getters: {
    detailWeather(): string {
      const i = this.data.data?.weather.content.today
      if (!i) return '' //如果没有查到数据直接返回
      return `[${i?.time}]  ${i?.condition} ${i?.wind} `
    },
  },
})

const instance = useWeatherStore()
const { setItem, getItem } = useStorage()
instance.$subscribe((mutation, state) => {
  setItem(instance.$id, { ...state })
})

const init = getItem<Partial<IWeatherStoreType>>(instance.$id)
//这个值必须判断一下如果有值则打补丁，否则会异常报错
if (init) {
  instance.$patch({
    city: init?.city,
    data: init?.data,
  })
}

export default useWeatherStore
