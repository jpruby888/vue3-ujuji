<script lang="ts" setup="setup">
  import type { ISite_config } from '@/api/siteApi'
  import { toRefs } from 'vue'

  const prop = defineProps<{
    state: Partial<ISite_config>
  }>()
  const { site_name, site_desc } = toRefs(prop.state)
</script>

<template>
  <div class="title text-center mt-8">
    <h3 class="font-bold text-4xl">{{ site_name }}</h3>
    <div class="desc mt-6 text-sm">{{ site_desc }}</div>
  </div>
</template>

<style lang="scss" scoped>
  .title {
    color: var(--site-name-color);
  }
</style>
