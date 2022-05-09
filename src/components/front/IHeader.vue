<script lang="ts" setup="setup">
  import useWeatherStore from '@/store/hooks/useWeatherStore'
  import { computed, ref } from 'vue'
  import useWeather from '@/hooks/api/useWeather'
  import { storeToRefs } from 'pinia'
  import city from '@/assets/data/city.json'
  import MsgDialog from '@/components/front/header/MsgDialog.vue'
  import News from '@/components/front/header/News.vue'
  import NewLinks from '@/components/front/header/NewLinks.vue'
  useWeather()
  const weatherStore = useWeatherStore()
  const refWeather = storeToRefs(weatherStore)
  const cityValue = ref<string[]>([])
  const showPopover = ref(false)
  const info = computed(() => {
    const i = weatherStore.data.data?.weather.content
    if (!i) return '' //如果没有查到数据直接返回
    return `[${i?.city}] ${i?.today.condition} ${i?.today.temp} `
  })
  const handleChange = (val: string[]) => {
    if (!val.length) return
    weatherStore.changeCity(val[val.length - 1])
    console.log(val)

    setTimeout(() => {
      showPopover.value = false
    }, 1000)
  }
</script>

<template>
  <div class="headers flex justify-between px-2">
    <div class="left">
      <el-popover
        placement="bottom"
        title="城市选择"
        :width="200"
        trigger="click"
        :visible="showPopover"
      >
        <template #default>
          <el-cascader
            v-model="cityValue"
            size="small"
            aria-autocomplete="none"
            :options="city"
            filterable
            placeholder="可搜索城市呦！"
            @change="handleChange"
          />
        </template>
        <template #reference>
          <span class="text-xs cursor-pointer" type="text" @click="showPopover = !showPopover">
            {{ info }}
          </span>
        </template>
      </el-popover>
    </div>
    <div class="right">
      <ul class="flex space-x-2">
        <li><news /></li>
        <li><msg-dialog /></li>
        <li><new-links /></li>
        <li><a href="#">设置</a></li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .headers {
    color: var(--site-name-color);
  }
</style>
