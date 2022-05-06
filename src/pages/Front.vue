<script lang="ts" setup="setup">
  import useSiteConfig from '@/hooks/api/useSiteConfig'
  import { computed } from 'vue'

  const { configStore } = useSiteConfig()
  const state = configStore.$state
  const bgImg = computed(() => {
    return `url('${state.background_image}')`
  })
</script>

<template>
  <div class="front h-full text-gray-200">
    <div class="bg-wrapper h-full bg-cover bg-no-repeat opacity-95 bg-blend-screen" />
    <!--      header-->
    <div class="headers flex justify-between">
      <div class="left">[成都] 多云转阴 29℃</div>
      <div class="right">
        <ul class="flex space-x-2">
          <li><a href="#">新闻</a></li>
          <li><a href="#">留言</a></li>
          <li><a href="#">最新</a></li>
          <li><a href="#">设置</a></li>
        </ul>
      </div>
    </div>
    <!--      title-->
    <div class="title text-center">
      <h3>{{ state.site_name }}</h3>
      <div class="desc">{{ state.site_desc }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .bg-wrapper {
    background-image: v-bind(bgImg);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -10;
    background-position: center 0;
  }
</style>
