import useHttp from '@/api/useHttp'
import type { BasicResp } from '@/api/types'

/**
 * 验证码获取
 */

export interface IVerifyData {
  code: number
  data: IData
  msg: string
}

export interface IData {
  id: string
  img: string
}

export const reqVerify = () => {
  return useHttp<BasicResp<IVerifyData>>({
    url: `/verify/v1`,
    method: 'get',
  })
}
