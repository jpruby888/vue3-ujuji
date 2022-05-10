<script lang="ts" setup="setup">
  import type { Ref } from 'vue'
  import { ref, toRef } from 'vue'
  import useNewLinks from '@/hooks/api/useNewLinks'
  import { formatDateYMD } from '@/utils/date'
  import useSiteSettingsStore from '@/store/hooks/useSiteSettingsStore'
  import AppIcon from '@/components/common/AppIcon.vue'

  const visible = ref(false)
  const siteSettingsStore = useSiteSettingsStore()
  const user_id = toRef(siteSettingsStore.$state, 'user_id')

  const { loading, refresh, newLinks } = useNewLinks(user_id as Ref<number>)

  const handleOpen = () => {
    refresh()
  }
</script>

<template>
  <a href="#" class="flex items-center space-x-0.5" @click.prevent="visible = true">
    <app-icon class="text-lg" icon="akar-icons:link-on"></app-icon>
    <span>最新</span>
  </a>
  <el-dialog v-model="visible" width="500px" title="最新链接" :modal="false" @open="handleOpen">
    <ul v-loading="loading">
      <li
        v-for="(item, i) in newLinks"
        :key="i"
        class="py-1 border-b border-gray-400 border-dashed flex justify-between"
      >
        <a
          class="hover:text-blue-700 truncate w-2/3"
          :href="item.link"
          target="_blank"
          :title="item.description"
        >
          {{ i + 1 }} 、 {{ item.title }}
        </a>
        <div>{{ formatDateYMD(item.created_at) }}</div>
      </li>
    </ul>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
