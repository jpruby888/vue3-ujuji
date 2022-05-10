<script lang="ts" setup="setup">
  import AppIcon from '@/components/common/AppIcon.vue'
  import { User } from '@element-plus/icons-vue'
</script>

<template>
  <el-dropdown trigger="click" size="small">
    <span class="el-dropdown-link">
      <a href="#" class="flex items-center space-x-0.5;">
        <app-icon class="text-lg" icon="icon-park:setting-two"></app-icon>
        <span>设置</span>
      </a>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :icon="User" class="text-sm">进入后台</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
  .el-dropdown-link {
    color: var(--site-name-color);
    @apply text-base;
  }
</style>
