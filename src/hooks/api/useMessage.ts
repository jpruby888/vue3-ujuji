import type { IMessageData } from '@/api/messageApi'
import type { Ref } from 'vue'
import { ref, watch } from 'vue'
import type { msgType } from '@/api/messageApi'
import reqMessage from '@/api/messageApi'
import { OK_CODE } from '@/app/keys'

const useMessage = (
  size: Ref<number>,
  page: Ref<number>,
  userId: Ref<number>,
  msgType: msgType,
  immediate = false
) => {
  const messageData = ref<Partial<IMessageData>>({})

  const refresh = () => {
    if (userId.value <= 0) return
    reqMessage(userId.value, msgType, page.value, size.value).then((res) => {
      if (res.code === OK_CODE) {
        messageData.value = res.data
      }
    })
  }

  watch(
    [userId, page, size],
    () => {
      refresh()
    },
    { immediate }
  )

  return {
    refresh,
    messageData,
  }
}

export default useMessage
