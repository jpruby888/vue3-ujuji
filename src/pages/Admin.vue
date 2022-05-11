<script lang="ts" setup="setup">
  import { ref } from 'vue'
  import AppIcon from '@/components/common/AppIcon.vue'
  import { useRouter } from 'vue-router'
  import useUserStore from '@/store/hooks/useUserStore'
  import { ArrowDown } from '@element-plus/icons-vue'
  import asideMenu from '@/router/asideMenu'

  const isCollapse = ref(false)
  //退出登录
  const router = useRouter()
  const userStore = useUserStore()
  const handleLogout = () => {
    //clear store localstorage
    userStore.logout()
    //路由跳转
    router.push({ name: 'Login' })
  }
  const handleCommand = (v: string) => {
    switch (v) {
      case 'logout':
        handleLogout()
        break
    }
  }
  //侧边栏
</script>

<template>
  <div class="admin">
    <div class="header">
      <div class="header-left">
        <div
          class="fold-btn cursor-pointer flex items-center justify-center ml-2"
          @click="isCollapse = !isCollapse"
        >
          <app-icon v-show="!isCollapse" class="text-2xl" icon="ant-design:menu-fold-outlined" />
          <app-icon v-show="isCollapse" class="text-2xl" icon="ant-design:menu-unfold-outlined" />
        </div>
        <div class="brand">
          <span>优聚集管理系统</span>
        </div>
      </div>
      <div class="header-right mr-5">
        <el-dropdown size="large" placement="bottom-start" @command="handleCommand">
          <span class="el-dropdown-link">
            <div class="avatar flex items-center justify-center">
              <el-avatar shape="circle" :size="35" fit="cover" :src="userStore.info.avatar" />
              <span class="ml-2 space-x-0.5">
                {{ userStore.info.username }}:
                {{ 'user' === userStore.info.role ? '普通用户' : '管理员' }}
              </span>
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </div>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="main-ctn">
      <div class="lef-ctn" :class="{ fold: isCollapse }">
        <ul class="menu">
          <li v-for="(item, i) in asideMenu" :key="i" class="menu-item">
            <router-link :to="{ name: item.routerName }">
              <app-icon :icon="item.icon" class="text-base" />
              <span>{{ item.name }}</span>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="right-ctn">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  $header-height: 4rem;
  $left-width: 13rem;
  .admin {
    @apply h-full w-full;
  }
  .header {
    @apply flex items-center justify-between px-2 border-b border-gray-300 shadow-md;
    height: $header-height;
    .header-left {
      @apply flex;
      .brand {
        @apply ml-4 rounded bg-gray-200 p-1.5 shadow-lg;
        span {
          @apply text-lg select-none;
        }
      }
    }
    .header-right {
    }
  }
  .main-ctn {
    @apply flex;
    height: calc(100% - #{$header-height});

    .lef-ctn {
      @apply bg-green-300 h-full transition-all;
      width: $left-width;
      &.fold {
        @apply w-0 transition-all;
      }
      .menu {
        .menu-item {
          @apply px-1 py-4 text-base text-center bg-purple-600 h-full;
          a {
            @apply inline-flex items-center justify-center space-x-2;
          }
        }
      }
    }
    .right-ctn {
      @apply bg-indigo-300 h-full flex-1;
      //width: calc(100% - #{$left-width});
    }
  }
</style>
