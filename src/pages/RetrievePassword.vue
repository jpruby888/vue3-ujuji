<script lang="ts" setup="setup">
  import { reactive, ref } from 'vue'
  import useVerify from '@/hooks/api/useVerify'
  import type { FormInstance } from 'element-plus'
  import { ElMessage } from 'element-plus'
  import { useRouter } from 'vue-router'
  import type { IFindPassParams, IUpdatePassParams2 } from '@/api/verifyApi'
  import { reqFindPassEmailVerify, reqUpdatePassword } from '@/api/verifyApi'

  const formData = reactive<IFindPassParams>({
    verify_id: '',
    email: '',
    verify_code: '',
  })
  const { refresh, image, imageID } = useVerify()
  //input框规则
  const rules = {
    email: [
      { required: true, message: '邮箱不能为空' },
      {
        type: 'email',
        message: '请输入正确的邮箱格式',
        trigger: ['blur', 'change'],
      },
    ],
    verify_code: [{ required: true, message: '验证码不能为空' }],
  }
  //提交时自带验证全部
  const ruleFormRef = ref<FormInstance>()
  const router = useRouter()
  //pinia 存储调用
  //提交表单
  const handleSubmit = (formEl: FormInstance | undefined) => {
    formEl?.validate().then((ok: boolean) => {
      if (!ok) return
      reqFindPassEmailVerify(Object.assign({}, formData, { verify_id: imageID.value }))
        .then(({ msg }) => {
          ElMessage.success(msg)
          refresh() //跳转前更一下验证码
          active.value = 1
        })
        .catch((err) => {
          ElMessage.error(err)
        })
    })
  }
  //步骤条
  const active = ref(0)
  //第二部数据
  const formData2 = reactive<IUpdatePassParams2>({
    verify_id: '',
    email: '',
    verify_code: '',
    email_code: '',
    password: '',
  })

  //input框规则
  const rules2 = {
    email: [
      { required: true, message: '邮箱名不能为空' },
      {
        type: 'email',
        message: '请输入正确的邮箱格式',
        trigger: ['blur', 'change'],
      },
    ],
    verify_code: [{ required: true, message: '验证码不能为空' }],
    email_code: [{ required: true, message: '邮箱验证码不能为空' }],
    password: [{ required: true, message: '密码不能为空' }],
  }
  //提交时自带验证全部
  const ruleFormRef2 = ref<FormInstance>()
  // 验证逻辑
  const handleUpdatePass = (formEl: FormInstance | undefined) => {
    formEl?.validate().then((ok: boolean) => {
      if (!ok) return
      reqUpdatePassword(Object.assign({}, formData2, { verify_id: imageID.value }))
        .then(({ msg }) => {
          ElMessage.success(msg)
          router.push({ name: 'Login' })
        })
        .catch((err) => {
          ElMessage.error(err)
        })
    })
  }
</script>

<template>
  <div class="wrapper">
    <div class="card">
      <div class="title flex justify-between items-end border-b border-gray-200 mb-4">
        <span class="block text-2xl font-bold title">找回密码</span>
        <span>
          <el-button type="text" size="small" @click="$router.push({ name: 'Login' })">
            立即登录
          </el-button>
          <el-button type="text" size="small" @click="$router.push({ name: 'Front' })">
            返回首页
          </el-button>
          <el-button type="text" size="small">忘记密码</el-button>
        </span>
      </div>
      <div class="step">
        <el-steps :active="active" finish-status="success" align-center>
          <el-step title="发送邮件" />
          <el-step title="更新密码" />
        </el-steps>
      </div>
      <!--      第一步-->
      <div v-show="active === 0">
        <el-form
          ref="ruleFormRef"
          :rules="rules"
          :model="formData"
          label-width="80px"
          @submit.prevent="handleSubmit(ruleFormRef)"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="formData.email" placeholder="请输入邮箱"></el-input>
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
          <el-form-item>
            <div class="inline-flex space-x-2"></div>
            <el-button native-type="submit" type="primary">发送邮件</el-button>
            <el-button type="success" @click="active = 1">进入第二步</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--      第二部-->
      <div v-show="active === 1">
        <el-form
          ref="ruleFormRef2"
          :rules="rules2"
          :model="formData2"
          label-width="100px"
          @submit.prevent="handleUpdatePass(ruleFormRef2)"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="formData2.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="email_code">
            <el-input v-model="formData2.email_code" placeholder=" "></el-input>
          </el-form-item>
          <el-form-item label="验证" prop="verify_code">
            <div class="inline-flex items-center space-x-2 w-full">
              <el-input
                v-model="formData2.verify_code"
                placeholder="验证码"
                type="password"
                show-password
              ></el-input>
              <img :src="image" alt="验证码" class="rounded cursor-pointer w-20" @click="refresh" />
            </div>
          </el-form-item>
          <el-form-item label="新密码" prop="password">
            <el-input
              v-model="formData2.password"
              type="password"
              placeholder="新密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <div class="inline-flex space-x-2"></div>
            <el-button native-type="submit" type="danger">更新密码</el-button>
            <el-button type="success" @click="active = 0">返回第一步</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-alert
        title="温馨提示"
        type="info"
        description="当找回密码发送邮件成功时，邮件内的验证码有效期30分钟，30分钟内无法再次发送找回邮件。若收件箱无邮件，请于垃圾箱内找寻验证码。"
        show-icon
        :closable="false"
      />
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
