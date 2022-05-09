<script lang="ts" setup="setup">
  import { ref } from 'vue'
  import AppIcon from '@/components/common/AppIcon.vue'
  import useNews from '@/hooks/api/useNews'
  const visible = ref(false)
  const { refresh, news, loading } = useNews()
  const handleOpen = () => {
    refresh()
  }
</script>

<template>
  <a href="#" class="flex items-center space-x-0.5" @click="visible = true">
    <app-icon icon="bx:bx-news" class="text-lg"></app-icon>
    <span>新闻</span>
  </a>
  <el-dialog
    v-model="visible"
    width="500px"
    title="每天60秒读世界"
    :modal="false"
    @open="handleOpen"
  >
    <ul v-loading="loading">
      <li v-for="(item, i) in news" :key="i" class="mb-2 border-b border-dashed border-gray-400">
        {{ item }}
        <span v-if="item.includes('、')">
          <a
            class="text-blue-500 block flex justify-end"
            target="_blank"
            :href="`https://www.baidu.com/s?ie=UTF-8&wd=${encodeURIComponent(item)}`"
          >
            [百度详情]
          </a>
        </span>
      </li>
    </ul>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
