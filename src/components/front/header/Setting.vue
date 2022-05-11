<script lang="ts" setup="setup">
  import AppIcon from '@/components/common/AppIcon.vue'
  import { User } from '@element-plus/icons-vue'
  import useUserStore from '@/store/hooks/useUserStore'
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'

  const userStore = useUserStore()

  const isLogin = computed(() => {
    return (userStore.info?.id || 0) > 0
  })
  const router = useRouter()
  const handleCommand = (v: string) => {
    switch (v) {
      case 'dashBord':
        if (isLogin.value) {
          router.push({ name: 'Admin' })
        } else {
          router.push({ name: 'Login' })
        }
    }
  }
</script>

<template>
  <el-dropdown trigger="click" size="small" @command="handleCommand">
    <span class="el-dropdown-link">
      <a href="#" class="flex items-center space-x-0.5;">
        <app-icon class="text-lg" icon="icon-park:setting-two"></app-icon>
        <span>设置</span>
      </a>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :icon="User" class="text-sm" command="dashBord">
          <span>
            {{ isLogin ? '进入后台' : '登录注册' }}
          </span>
        </el-dropdown-item>
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
