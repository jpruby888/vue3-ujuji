<script lang="ts" setup="setup">
  import useSiteConfig, { useSiteBoxes } from '@/hooks/api/useSiteConfig'
  import type { Ref } from 'vue'
  import { computed, toRefs } from 'vue'

  import SearchBox from '@/components/front/SearchBox.vue'
  import Boxes from '@/components/front/Boxes.vue'
  import IFooter from '@/components/front/IFooter.vue'
  import ITitle from '@/components/front/ITitle.vue'

  const { configStore } = useSiteConfig()
  const state = configStore.$state
  const bgImg = computed(() => {
    return `url('${state.background_image}')`
  })
  const {
    site_name_color,
    box_background_color,
    box_title_color,
    box_link_color,
    box_link_hover_color,
    box_back_hover_color,
    user_id,
  } = toRefs(state)
  // const userID = ref(state.user_id)

  const { boxes } = useSiteBoxes(user_id as Ref<number | undefined>)
  // const { boxes } = useSiteBoxes(toRef(state, 'user_id'))
</script>

<template>
  <div class="front h-full">
    <div class="bg-wrapper h-full bg-cover bg-no-repeat opacity-95 bg-blend-screen" />
    <!--      header-->
    <div class="headers flex justify-between">
      <div class="left">[成都] 多云转阴 29℃</div>
      <div class="right">
        <ul class="flex space-x-2">
          <li><a href="#">新闻</a></li>
          <li><a href="#">留言</a></li>
          <li><a href="#">最新</a></li>
          <li><a href="#">设置</a></li>
        </ul>
      </div>
    </div>
    <!--      title-->
    <ITitle :state="state" />
    <!--    search-->
    <search-box />
    <!--    box-->
    <Boxes :boxes="boxes" />
    <!--    footer-->
    <IFooter />
  </div>
</template>

<style lang="scss" scoped>
  @import '../assets/styles/mixin';

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

  .title {
    color: var(--site-name-color);
  }

  .front {
    --site-name-color: v-bind(site_name_color);
    --box-background-color: v-bind(box_background_color);
    --box-title-color: v-bind(box_title_color);
    --box-link-color: v-bind(box_link_color);
    --box-link-hover-color: v-bind(box_link_hover_color);
    --box-back-hover-color: v-bind(box_back_hover_color);
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

  .headers {
    color: var(--site-name-color);
  }

  .bg-wrapper {
    background-image: v-bind(bgImg);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -10;
    background-position: center 0;
  }
</style>
