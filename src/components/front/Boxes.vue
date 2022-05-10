<script lang="ts" setup="setup">
  import type { IBoxesData } from '@/api/siteApi'
  import { ref, watch } from 'vue'
  import AppIcon from '@/components/common/AppIcon.vue'
  import ExpandDialog from '@/components/front/Boxes/ExpandDialog.vue'

  const props = defineProps<{
    boxes: IBoxesData[]
  }>()

  const notices = ref<{ [boxID: number]: string }>({})
  watch(
    () => props.boxes,
    () => {
      {
        props.boxes.forEach((item) => {
          notices.value[item.id] = item.introduction
        })
      }
    }
  )

  const handleEnter = (boxID: number, linkID: number) => {
    const box = props.boxes.find((item) => item.id === boxID)
    if (box) {
      const link = box.links.find((item) => item.id === linkID)
      if (link) {
        notices.value[boxID] = link.description
      }
    }
  }
  const showExpand = ref(false)
  const showData = ref<IBoxesData | undefined>()
  const handleShowExpand = (data: IBoxesData) => {
    showExpand.value = true
    showData.value = data
  }
</script>

<template>
  <div class="boxes grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
    <div v-for="(item, i) in boxes" :key="i" class="box mt-4 rounded-3xl p-3 m-1">
      <div class="box-title">
        <i v-if="item.icon" class="iconfont" :class="[item.icon]"></i>
        <span>{{ item.title }}</span>
        <div class="ctrls inline-flex space-x-1 absolute top-0 right-1">
          <div class="cursor-pointer" @click="handleShowExpand(item)">
            <app-icon icon="bx:bx-expand" />
          </div>
        </div>
      </div>
      <div class="box-tips whitespace-nowrap overflow-hidden">{{ notices[item.id] }}</div>
      <div class="box-item">
        <a
          v-for="(link, m) in item.links"
          :key="m"
          class="box-link space-x-0.5"
          target="_blank"
          :href="link.link"
          @mouseenter="handleEnter(item.id, link.id)"
        >
          <i v-if="item.icon" class="iconfont" :class="[link.icon]"></i>
          <span>{{ link.title }}</span>
        </a>
      </div>
    </div>
  </div>
  <ExpandDialog :box="showData" :visible="showExpand" @close="showExpand = false" />
</template>

<style lang="scss" scoped>
  @import '../../assets/styles/mixin';

  .box-tips {
    @apply text-center text-sm truncate w-full;
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
    @apply relative text-center font-bold text-xl mb-1 space-x-0.5;

    &:hover {
      .ctrls {
        @apply inline-flex transition-all;
      }
    }
    .ctrls {
      @apply hidden transition-all;
    }
  }

  .box {
    @apply transition-all;
    background: var(--box-background-color);

    &:hover {
      background: var(--box-back-hover-color);
    }
  }
</style>
