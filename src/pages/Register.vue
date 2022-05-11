<script lang="ts" setup="setup">
  import { reactive, ref } from 'vue'
  import useVerify from '@/hooks/api/useVerify'
  import type { IRegisterData } from '@/api/userApi'
  import { reqUserRegister } from '@/api/userApi'
  import type { FormInstance } from 'element-plus'
  import { ElMessage } from 'element-plus'
  import { useRouter } from 'vue-router'
  import { AgreeUrl } from '@/core/constant'
  import { reqEmailVerify } from '@/api/verifyApi'

  const formData = reactive<IRegisterData>({
    username: '',
    password: '',
    verify_id: '',
    verify_code: '',
    email: '',
    email_verify: '',
  })
  const { refresh, image, imageID } = useVerify()
  //input框规则
  const rules = {
    username: [{ required: true, message: '用户名不能为空' }],
    password: [{ required: true, message: '密码不能为空' }],
    email: [
      { required: true, message: '邮箱不能为空' },
      {
        type: 'email',
        message: '请输入正确的邮箱格式',
        trigger: ['blur', 'change'],
      },
    ],
    verify_code: [{ required: true, message: '验证码不能为空' }],
    email_verify: [{ required: true, message: '邮箱验证码不能为空' }],
  }
  //提交时自带验证全部
  const ruleFormRef = ref<FormInstance>()
  const router = useRouter()
  //pinia 存储调用
  //提交表单
  const handleSubmit = (formEl: FormInstance | undefined) => {
    formEl?.validate().then((ok: boolean) => {
      if (!ok) return
      if (!agree.value) {
        ElMessage.error('请先同意协议')
        return
      }
      reqUserRegister(Object.assign({}, formData, { verify_id: imageID.value }))
        .then(({ msg }) => {
          ElMessage.success(msg)
          router.push({ name: 'Login' })
        })
        .catch((err) => {
          ElMessage.error(err)
        })
    })
  }
  //协议同意选项,默认同意
  const agree = ref(true)

  //发送邮箱验证
  const sendEmailVerify = () => {
    if (!formData.email || !formData.verify_code) {
      ElMessage.error('请先输入邮箱验证码或邮箱地址')
      return
    }

    reqEmailVerify(Object.assign({}, formData, { verify_id: imageID.value }))
      .then((res) => {
        ElMessage.success(res.msg)
      })
      .catch((err) => {
        ElMessage.error(err)
      })
  }
</script>

<template>
  <div class="wrapper">
    <div class="card">
      <div class="title flex justify-between items-end border-b border-gray-200 mb-4">
        <span class="block text-2xl font-bold title">注册</span>
        <span>
          <el-button type="text" size="small" @click="$router.push({ name: 'Login' })">
            立即登录
          </el-button>
          <el-button type="text" size="small" @click="$router.push({ name: 'Front' })">
            返回首页
          </el-button>
          <el-button type="text" size="small" @click="$router.push({ name: 'RetrievePassword' })">
            忘记密码
          </el-button>
        </span>
      </div>
      <el-form
        ref="ruleFormRef"
        :rules="rules"
        :model="formData"
        label-width="100px"
        @submit.prevent="handleSubmit(ruleFormRef)"
      >
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
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" placeholder="请输入邮箱地址"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="verify_code">
          <div class="inline-flex items-center space-x-2 w-full">
            <el-input
              v-model="formData.verify_code"
              placeholder="验证码"
              type="password"
              show-password
            ></el-input>
            <img :src="image" alt="验证码" class="rounded cursor-pointer w-20" @click="refresh" />
          </div>
        </el-form-item>
        <el-form-item label="邮箱验证码" prop="email_verify">
          <div class="inline-flex items-center space-x-2">
            <el-input v-model="formData.email_verify" placeholder="请输入邮箱内的验证码"></el-input>
            <el-button @click="sendEmailVerify">发送</el-button>
          </div>
        </el-form-item>
        <el-form-item label="协议">
          <div class="inline-flex items-center">
            <el-checkbox v-model="agree" label="同意协议" size="large" />
            <a class="text-xs hover:underline" :href="AgreeUrl" target="_blank">
              《[优聚集]用户使用与免责申明》
            </a>
          </div>
        </el-form-item>
        <el-button native-type="submit" type="primary" class="w-full">注册</el-button>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .wrapper {
    @apply h-full w-full flex justify-center items-center bg-gray-100;
    .card {
      @apply rounded-2xl w-full p-4 sm:p-5  sm:max-w-md shadow-2xl bg-white;
    }
  }

  .el-form-item {
    @apply items-center;
  }
</style>
