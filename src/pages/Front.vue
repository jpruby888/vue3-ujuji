<script lang="ts" setup="setup">
  import useSiteConfig, { useSiteBoxes } from '@/hooks/api/useSiteConfig'
  import type { Ref } from 'vue'
  import { computed, toRefs } from 'vue'

  import SearchBox from '@/components/front/SearchBox.vue'
  import Boxes from '@/components/front/Boxes.vue'
  import IFooter from '@/components/front/IFooter.vue'
  import ITitle from '@/components/front/ITitle.vue'
  import IHeader from '@/components/front/IHeader.vue'

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
    <IHeader />
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

  .front {
    --site-name-color: v-bind(site_name_color);
    --box-background-color: v-bind(box_background_color);
    --box-title-color: v-bind(box_title_color);
    --box-link-color: v-bind(box_link_color);
    --box-link-hover-color: v-bind(box_link_hover_color);
    --box-back-hover-color: v-bind(box_back_hover_color);
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
