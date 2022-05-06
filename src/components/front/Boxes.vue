<script lang="ts" setup="setup"></script>

<template>
  <div class="boxes grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
    <div v-for="i in 10" :key="i" class="box mt-4 rounded-lg p-3 m-1">
      <div class="box-title text-center font-bold text-base">你好呀</div>
      <div class="box-tips">这是描述</div>
      <div class="box-item">
        <a v-for="i in 40" :key="i" class="box-link" href="#">站点...</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '../../assets/styles/mixin';

  .box-tips {
    @apply text-center text-sm;
    color: var(--box-title-color);
  }

  .box-item {
    @apply mt-3 flex flex-wrap items-center h-32 overflow-y-auto space-y-4 text-sm text-center;
    @include hide-scroll;

    .box-link {
      @apply w-1/3;
      color: var(--box-link-color);

      &:hover {
        color: var(--box-link-hover-color);
      }
    }
  }

  .box-title {
    color: var(--box-title-color);
  }

  .box {
    @apply transition-all;
    background: var(--box-background-color);

    &:hover {
      background: var(--box-back-hover-color);
    }
  }
</style>
