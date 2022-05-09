import useHttp from '@/api/useHttp'
import type { BasicResp } from '@/api/types'

export enum msgType {
  COMMON,
  FIXED,
}

export interface IMessageData {
  list: IList[]
  total: number
}

export interface IList {
  id: number
  user_id: number
  fixed: boolean
  nickname: string
  content: string
  read: boolean
  reply: string
  created_at: string
}

const reqMessage = (userId: number, msgType: msgType, page: number, size: number) => {
  return useHttp<BasicResp<IMessageData>>({
    url: `/leave_msg/v1/${msgType}/${userId}`,
    method: 'get',
    params: {
      page,
      size,
    },
  })
}

/**
 * 提交新留言
 */

export interface IReqMsgBody {
  content: string
  nickname: string
  verify_str: string
  verify_id: string
  code?: number
  user_id: number
}

export const reqAddMsg = (p: IReqMsgBody) => {
  return useHttp<BasicResp<null>>({
    url: `/leave_msg/v1`,
    method: 'post',
    data: {
      ...p,
    },
  })
}

export default reqMessage
