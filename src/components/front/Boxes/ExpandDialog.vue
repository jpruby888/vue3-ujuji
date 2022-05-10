<script lang="ts" setup="setup">
  import useWidth from '@/hooks/useWidth'
  import type { IBoxesData } from '@/api/siteApi'
  import { computed } from 'vue'

  const { strWidth } = useWidth(500)
  const props = defineProps<{
    box: IBoxesData
    visible: boolean
  }>()

  const emits = defineEmits(['close'])
  const title = computed(() => {
    return `❤${props.box?.title}❤`
  })
</script>

<template>
  <el-dialog
    :model-value="props.visible"
    :width="strWidth"
    :title="title"
    center
    @close="emits('close')"
  >
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-1">
      <div
        v-for="(item, i) in props.box.links"
        :key="i"
        class="item w-full border rounded border-gray-200 flex items-center justify-center"
      >
        <a
          :href="item.link"
          target="_blank"
          class="block text-gray-500 inline-block px-2 py-1 truncate"
        >
          <el-tooltip :content="item.description || '没有描述'" placement="top" effect="light">
            {{ item.title }}
          </el-tooltip>
        </a>
      </div>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
  .item {
    &:hover {
      @apply shadow-md border-blue-500 transition-all;
      a {
        @apply text-black;
      }
    }
  }
</style>
