<script lang="ts" setup="setup">
  import { ref } from 'vue'
  import useNewLinks from '@/hooks/api/useNewLinks'
  import { formatDate } from '@/utils/date'

  const visible = ref(false)
  const { loading, refresh, newLinks } = useNewLinks()

  const handleOpen = () => {
    refresh()
  }
</script>

<template>
  <a href="#" class="flex items-center" @click.prevent="visible = true">
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
        <div>{{ formatDate(item.created_at) }}</div>
      </li>
    </ul>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
