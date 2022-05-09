<script lang="ts" setup="setup">
  import { reactive, ref, toRef, watch } from 'vue'
  import useVerify from '@/hooks/api/useVerify'
  import useMessage from '@/hooks/api/useMessage'
  import useSiteSettingsStore from '@/store/hooks/useSiteSettingsStore'
  import type { IReqMsgBody } from '@/api/messageApi'
  import { reqAddMsg } from '@/api/messageApi'
  import { msgType } from '@/api/messageApi'
  import MsgItem from '@/components/front/header/MsgItem.vue'
  import { ElMessage } from 'element-plus'
  import { OK_CODE } from '@/app/keys'
  import { Edit } from '@element-plus/icons-vue'

  const visible = ref(false)

  const { image, refresh, imageID } = useVerify()
  const settingsStore = useSiteSettingsStore()
  const getUserId = ref(0)
  // watch(settingsStore, () => {
  //   getUserId.value = settingsStore.$state.user_id as number
  // })

  const msgParam = reactive({ page: 1, size: 10 })
  const { messageData: fixedMsg, refresh: refreshFix } = useMessage(
    ref(0),
    ref(0),
    getUserId,
    msgType.FIXED,
    false
  )
  const { messageData: commonMsg, refresh: refreshCommon } = useMessage(
    toRef(msgParam, 'size'),
    toRef(msgParam, 'page'),
    getUserId,
    msgType.COMMON,
    false
  )
  const handlePageChanged = (p: number) => {
    msgParam.page = p
  }
  watch([visible], (v) => {
    if (v) {
      getUserId.value = settingsStore.$state.user_id as number
      refreshFix()
      refreshCommon()
    }
  })
  //form
  const formData = reactive<IReqMsgBody>({
    content: '',
    verify_id: imageID.value,
    verify_str: '',
    user_id: getUserId.value,
    nickname: '',
  })

  const handleSubmit = () => {
    if (!formData.content) {
      ElMessage.error('请输入内容')
      return
    }
    if (!formData.nickname) {
      ElMessage.error('请输入昵称')
      return
    }
    if (!formData.verify_str) {
      ElMessage.error('请输入验证码')
      return
    }
    console.log(formData.verify_id)
    reqAddMsg(
      Object.assign({}, formData, {
        user_id: settingsStore.$state.user_id,
        verify_id: imageID.value,
      })
    )
      .then(({ code, msg }) => {
        if (code === OK_CODE) {
          ElMessage.success(msg)
          refreshCommon()
          return
        }
        ElMessage.error(msg)
      })
      .catch((err) => {
        ElMessage.error(err)
      })
  }
</script>

<template>
  <a class="flex items-center space-x-0.5" href="#" @click.prevent="visible = true">
    <el-icon :size="15"><edit /></el-icon>
    <span>留言</span>
  </a>
  <el-dialog v-model="visible" width="400px" title="用户留言">
    <div class="header">
      <div class="box">
        <el-input
          v-model="formData.content"
          placeholder="输入留言"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
        ></el-input>
      </div>
      <div class="verify flex space-x-2 mt-2">
        <el-input
          v-model="formData.nickname"
          size="small"
          class="flex-1"
          placeholder="昵称"
        ></el-input>
        <el-input
          v-model="formData.verify_str"
          size="small"
          placeholder="验证码"
          class="flex-1"
        ></el-input>
        <img :src="image" alt="verify image" class="w-20 cursor-pointer rounded" @click="refresh" />
      </div>
      <div>
        <el-button size="small" class="mt-3" @click="handleSubmit">提交</el-button>
      </div>
    </div>
    <div class="border-t border-gray-300 my-3"></div>
    <div class="main">
      <ul class="items">
        <li v-for="(item, i) in fixedMsg.list" :key="i" class="msg border-gray-200 border-b mb-5">
          <msg-item :item="item" />
        </li>
      </ul>
      <ul class="items">
        <li v-for="(item, i) in commonMsg.list" :key="i" class="msg border-gray-200 border-b mb-5">
          <msg-item :item="item" />
        </li>
      </ul>
      <div class="page flex justify-center">
        <el-pagination
          :pager-count="5"
          :page-size="msgParam.size"
          :current-page="msgParam.page"
          layout="prev, pager, next"
          :total="commonMsg.total"
          @current-change="handlePageChanged"
        />
      </div>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
