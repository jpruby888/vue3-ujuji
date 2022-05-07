<script lang="ts" setup="setup">
  import AppIcon from '@/components/common/AppIcon.vue'
  import useSiteConfig from '@/hooks/api/useSiteConfig'
  import { computed, ref } from 'vue'
  import { jumpUrI } from '@/utils/url'

  const { searchStore } = useSiteConfig()
  const state = searchStore.$state
  const index = ref(0)
  const links = computed(() => {
    if (!state.length) return []
    let links = state[index.value].links
    if (links) {
      return links
    }
    return state[0].links
  })
  const linkIndex = ref(0)
  const activeLink = computed(() => {
    return links.value[linkIndex.value]
  })
  //search
  let q = ref('')
  const handleSearch = () => {
    if (!q.value) return
    let aimUrI = activeLink.value.link.replace('[kw]', encodeURIComponent(q.value))
    jumpUrI(aimUrI)
  }
</script>

<template>
  <div class="search-wrapper text-center mt-5">
    <div class="flex space-x-3 justify-center mb-2">
      <a v-for="(item, i) in state" :key="i" href="#" class="search-item" @click="index = i">
        {{ item.name }}
      </a>
    </div>
    <div class="search-sites space-x-3">
      <a
        v-for="(item, i) in links"
        :key="i"
        href="#"
        class="search-site-item"
        :class="{ active: linkIndex === i }"
        @click="linkIndex = i"
      >
        {{ item.name }}
      </a>
    </div>
    <div v-if="activeLink" class="search-box relative mx-auto mt-5 w-full sm:w-128">
      <input
        v-model="q"
        type="text"
        class="search-input"
        :placeholder="activeLink.placeholder"
        @keyup.enter="handleSearch"
      />
      <button class="search-btn" @click="handleSearch">
        <app-icon class="text-2xl" icon="bx:search-alt" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .search-wrapper {
    color: var(--site-name-color);
  }

  .search-input {
    @apply outline-none text-black w-full pl-3 pr-20 py-2 rounded-3xl;
    background: var(--box-background-color);
    color: var(--box-title-color);

    &:hover {
      background: var(--box-back-hover-color);
    }

    &:focus ~ .search-btn {
      color: var(--box-title-color);
    }
  }

  .search-btn {
    @apply text-gray-400 absolute inset-y-0 right-0 w-16 flex justify-center items-center;
  }

  .search-site-item {
    &.active {
      @apply font-bold;
    }
  }
</style>
