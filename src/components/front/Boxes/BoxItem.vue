<script lang="ts" setup="setup">
  import type { IBoxesData, ILink } from '@/api/siteApi'
  import AppIcon from '@/components/common/AppIcon.vue'
  import { computed, ref } from 'vue'

  const props = defineProps<{
    box: IBoxesData
  }>()
  const emits = defineEmits(['expand'])
  const desc = ref('')
  // watch(
  //   () => props.box,
  //   (b) => {
  //     console.log(`b:${b.introduction}`)
  //     if (b.introduction) {
  //       desc.value = b.introduction
  //     }
  //   }
  // )
  const handleEnter = (item: ILink) => {
    if (item.description) {
      desc.value = item.description
    }
  }
  const handleBoxEnter = () => {
    desc.value = props.box.introduction || ''
  }
  const orderByTime = ref(false)
  const computedLink = computed(() => {
    const links = JSON.parse(JSON.stringify(props.box.links)) as ILink[]
    if (!orderByTime.value) {
      return links || []
    }

    return links.sort((item1, item2) => {
      return new Date(item2.created_at).getTime() - new Date(item1.created_at).getTime()
    })
  })
</script>

<template>
  <div class="box mt-4 rounded-3xl p-3 m-1" @mouseenter="handleBoxEnter">
    <div class="box-title">
      <i v-if="props.box.icon" class="iconfont" :class="[props.box.icon]"></i>
      <span>{{ props.box.title }}</span>
      <span class="text-xs">({{ computedLink.length || 0 }})</span>
      <div class="ctrls inline-flex space-x-1 absolute top-0 right-1">
        <div class="cursor-pointer" @click="orderByTime = !orderByTime">
          <app-icon icon="icon-park-outline:creation-date-sort" />
        </div>
        <div class="cursor-pointer" @click="emits('expand', props.box)">
          <app-icon icon="bx:bx-expand" />
        </div>
      </div>
    </div>
    <div class="box-tips whitespace-nowrap overflow-hidden">{{ desc }}</div>
    <div v-if="props.box.pwd === 'need'" class="pwd flex items-center justify-center px-3">
      <input class="pwd-input flex-1" type="password" placeholder="输入密码" />
      <button class="pwd-btn">确认</button>
      <!--    todo  第十五节课后半部-->
    </div>
    <div class="box-item">
      <a
        v-for="(link, m) in computedLink"
        :key="m"
        class="box-link space-x-0.5"
        target="_blank"
        :href="link.link"
        @mouseenter.stop="handleEnter(link)"
      >
        <i v-if="link.icon" class="iconfont" :class="[link.icon]"></i>
        <span>{{ link.title }}</span>
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '../../../assets/styles/mixin';

  .box-tips {
    @apply text-center text-sm truncate w-full h-5;
    color: var(--box-title-color);
    text-overflow: ellipsis;
  }

  .box-item {
    @apply mt-3 flex flex-wrap items-center h-32 overflow-y-auto  text-sm text-center;
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
  .pwd {
    @apply h-8;
    .pwd-input {
      @apply px-2 py-1 rounded outline-none h-full border;
      border-color: var(--box-title-color);
      background-color: var(--box-background-color);
      color: var(--box-link-color);
    }
    .pwd-btn {
      @apply ml-3 rounded px-3 h-full;
      background: var(--box-background-color);
      color: var(--box-title-color);
    }
  }
</style>
