<script lang="ts" setup="setup">
  import type { IBoxesData } from '@/api/siteApi'

  defineProps<{
    boxes: IBoxesData[]
  }>()
</script>

<template>
  <div class="boxes grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
    <div v-for="(item, i) in boxes" :key="i" class="box mt-4 rounded-3xl p-3 m-1">
      <div class="box-title text-center font-bold text-xl mb-1">{{ item.title }}</div>
      <div class="box-tips whitespace-nowrap overflow-hidden">{{ item.introduction }}</div>
      <div class="box-item">
        <a
          v-for="(link, m) in item.links"
          :key="m"
          class="box-link"
          target="_blank"
          :href="link.link"
        >
          {{ link.title }}
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '../../assets/styles/mixin';

  .box-tips {
    @apply text-center text-sm;
    color: var(--box-title-color);
    text-overflow: ellipsis;
  }

  .box-item {
    @apply mt-5 flex flex-wrap items-center h-32 overflow-y-auto  text-sm text-center;
    @include hide-scroll;

    .box-link {
      @apply w-1/3 mb-6;
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
