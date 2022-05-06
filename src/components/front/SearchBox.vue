<script lang="ts" setup="setup">
  import AppIcon from '@/components/common/AppIcon.vue'
</script>

<template>
  <div class="search-wrapper text-center mt-5">
    <div class="search-site-cate flex space-x-3 justify-center">
      <a href="#" class="search-item">搜索</a>
      <a href="#" class="search-item">网盘</a>
    </div>
    <div class="search-sites flex justify-center space-x-3">
      <a href="#" class="search-site-item">百度</a>
      <a href="#" class="search-site-item">谷歌</a>
      <a href="#" class="search-site-item">必应</a>
    </div>
    <div class="search-box relative mx-auto mt-5 w-full sm:w-96">
      <input type="text" class="search-input" />
      <button class="absolute inset-y-0 right-0 w-16 flex justify-center items-center">
        <app-icon class="text-2xl" icon="bx:search-alt" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .search-wrapper {
    color: var(--site-name-color);
  }

  .search-input {
    @apply outline-none text-black w-full pl-3 pr-20 py-2 bg-gray-400 bg-opacity-30 rounded-3xl focus:bg-opacity-60;
  }
</style>
