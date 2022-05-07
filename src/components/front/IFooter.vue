<script lang="ts" setup="setup">
  import { version } from '../../../package.json'
</script>

<template>
  <footer class="footer">
    <p class="text-xs space-x-2">
      &copy 2022({{ version }})
      <a href="#">源代码</a>
      <a href="https://lzpan.com/" target="_blank">懒盘搜索</a>
      <a href="https://mall.misiai.com" target="_blank">💰淘宝优惠券系统💰</a>
      <a href="#">公众号</a>
      &nbsp;
    </p>
    <p class="text-xs mt-3 select-none">
      <a href="">备案号: xxxx12.3.5</a>
    </p>
  </footer>
</template>

<style lang="scss" scoped>
  .footer {
    @apply text-center my-5;
    color: var(--site-name-color);
  }
</style>
