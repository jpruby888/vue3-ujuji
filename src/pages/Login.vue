<script lang="ts" setup="setup">
  import { reactive } from 'vue'
  import useVerify from '@/hooks/api/useVerify'
  import type { ILoginReqData } from '@/api/userApi'
  import { reqUserLogin } from '@/api/userApi'
  import { OK_CODE } from '@/app/keys'
  import { ElMessage } from 'element-plus'
  import useUserStore from '@/store/hooks/useUserStore'
  import { useRouter } from 'vue-router'

  const formData = reactive<ILoginReqData>({
    username: '',
    password: '',
    verify_id: '',
    verify_str: '',
  })
  const { refresh, image, imageID } = useVerify()
  //input框规则
  const rules = {
    username: [{ required: true, message: '用户名不能为空' }],
    password: [{ required: true, message: '密码不能为空' }],
    verify_str: [{ required: true, message: '验证码不能为空' }],
  }
  const router = useRouter()
  //pinia 存储调用
  const userStore = useUserStore()
  //提交表单
  const handleSubmit = () => {
    reqUserLogin(Object.assign({}, formData, { verify_id: imageID.value })).then(
      ({ code, data, msg }) => {
        if (code === OK_CODE) {
          ElMessage.success(msg)
          userStore.load(data)
          router.push({ name: 'Admin' })
        } else {
          ElMessage.error(msg)
        }
      }
    )
  }
</script>

<template>
  <div><button @click="router.push({ name: 'Admin' })">测试路由</button></div>
  <div class="wrapper">
    <div class="card">
      <div class="title">
        <span class="block text-2xl font-bold title border-b border-gray-200 mb-4 text-center">
          登录
        </span>
      </div>
      <el-form :rules="rules" :model="formData" label-width="80px" @submit.prevent="handleSubmit">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="formData.password"
            placeholder="密码"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="verify_str">
          <div class="flex items-center">
            <el-input
              v-model="formData.verify_str"
              placeholder="验证码"
              type="password"
              show-password
            ></el-input>
            <img
              :src="image"
              alt="验证码"
              class="h-full ml-8 rounded cursor-pointer w-20"
              @click="refresh"
            />
          </div>
        </el-form-item>

        <el-button native-type="submit" type="primary" class="w-full">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .wrapper {
    @apply h-full w-full flex justify-center items-center bg-gray-100;
    .card {
      @apply rounded-2xl w-full p-4 sm:p-0 sm:w-1/3 sm:p-4 shadow-2xl bg-white;
    }
  }
</style>
