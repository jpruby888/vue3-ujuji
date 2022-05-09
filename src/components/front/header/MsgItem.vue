<script lang="ts" setup="setup">
  import { relativeTime } from '@/utils/date'
  import type { IList } from '@/api/messageApi'

  defineProps<{
    item: IList
  }>()
</script>

<template>
  <div class="user text-base flex items-center">
    <el-tag :type="item.fixed ? 'success' : 'danger'" effect="dark" size="small">
      {{ item.fixed ? '置顶' : '留言' }}
    </el-tag>
    <span class="text-blue-700 ml-1.5 font-bold text-sm">{{ item.nickname }}</span>
  </div>
  <p class="cnt text-xs mt-3">
    <span>{{ item.content }}</span>
  </p>
  <div v-if="item.reply" class="reply text-xs mt-3">
    <div class="font-bold text-red-500 text-sm mb-1">回复：</div>
    <p class="reply-cnt">
      <span>{{ item.reply }}</span>
    </p>
  </div>
  <div class="time flex justify-end text-xs text-gray-600 mt-3">
    {{ relativeTime(item.created_at) }}
  </div>
</template>

<style lang="scss" scoped>
  .cnt,
  .reply-cnt {
    //@apply inline-block text-gray-600 text-xs break-all pb-1 whitespace-pre-line;
    span {
      @apply leading-5 inline text-gray-600 text-xs break-all pb-0.5 whitespace-pre-line border-b border-dashed border-gray-400;
    }
  }
</style>
