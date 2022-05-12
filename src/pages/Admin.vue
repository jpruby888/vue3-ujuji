<script lang="ts" setup="setup">
  import { ref } from 'vue'
  import AppIcon from '@/components/common/AppIcon.vue'
  import { useRouter } from 'vue-router'
  import useUserStore from '@/store/hooks/useUserStore'
  import { ArrowDown } from '@element-plus/icons-vue'
  import useMenus from '@/router/asideMenu'

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
  const { asideMenu, activeIndex } = useMenus()
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
              <el-avatar shape="circle" :size="26" fit="cover" :src="userStore.info.avatar" />
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
        <div class="mobile-ctrl">
          <span>优聚集</span>
          <div class="flex items-center" @click="isCollapse = !isCollapse">
            <app-icon icon="ep:close-bold" class="text-lg"></app-icon>
          </div>
        </div>
        <ul class="menu">
          <li
            v-for="(item, i) in asideMenu"
            :key="i"
            class="menu-item"
            :class="{ active: i === activeIndex }"
          >
            <router-link :to="{ name: item.routerName }">
              <app-icon :icon="item.icon" class="text-base" />
              <span>{{ item.name }}</span>
            </router-link>
          </li>

          <!--          <li v-for="(item, i) in 10" :key="i" class="menu-item">-->
          <!--            <router-link :to="{ name: 'DashBoard' }">-->
          <!--              <app-icon icon="icon-park-outline:config" class="text-base" />-->
          <!--              <span>你好中国</span>-->
          <!--            </router-link>-->
          <!--          </li>-->
        </ul>
      </div>
      <div class="right-ctn">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '../assets/styles/mixin.scss';
  $header-height: 4rem;
  //$left-width: 13rem;
  .admin {
    @apply h-full w-full;
  }

  .header {
    @apply flex items-center justify-between px-2 border-b border-gray-300;
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
      @apply fixed inset-0 w-3/4 shadow-md  bg-white transition-all;
      @apply sm:transition-all sm:relative sm:w-adminLeftWidth;
      //&:not(.fold) {
      //  @apply w-0;
      //}
      &.fold {
        @apply w-0 transition-all;
        & > .menu {
          @apply w-0 transition-all;
        }

        & > .mobile-ctrl {
          @apply w-0 transition-all opacity-0;
        }
      }
      .mobile-ctrl {
        @apply h-10 border-b border-gray-300 flex items-center justify-between items-center px-2 sm:hidden;
        span {
          &:first-child {
            @apply font-bold text-lg;
          }
        }
      }
      .menu {
        @apply flex-1 h-full w-full border-r border-gray-300;
        @include scroll();
        .menu-item {
          @apply text-base;
          &.active {
            a {
              @apply bg-purple-600 text-gray-100;
            }
          }

          a {
            @apply hover:bg-indigo-300 text-gray-600 transition-all block w-full py-2  inline-flex  justify-center space-x-2;
          }
        }
      }
    }

    .right-ctn {
      @apply h-full flex-1 p-1.5;
      //width: calc(100% - #{$left-width});
    }
  }
</style>
