import useWeatherStore from '@/store/hooks/useWeatherStore'
import { watch, ref } from 'vue'
import type { IWeatherData } from '@/api/commonApi'
import { reqWeather } from '@/api/commonApi'

const useWeather = () => {
  const weatherStore = useWeatherStore()
  const rawData = ref('')
  const weather = ref<IWeatherData | undefined>()

  watch(
    () => weatherStore.$state.city,
    (city) => {
      if (!city) return
      reqWeather(city).then((res) => {
        rawData.value = res.data
        weather.value = JSON.parse(res.data)
      })
    },
    { immediate: true }
  )
  watch(weather, () => {
    weatherStore.$patch({
      data: weather.value,
    })
  })
  return {
    rawData,
    weather,
  }
}

export default useWeather
