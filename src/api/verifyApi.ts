import useHttp from '@/api/useHttp'
import type { BasicResp } from '@/api/types'
import type { IRegisterData } from '@/api/userApi'

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
/**
 * 获取邮箱验证码
 */

export const reqEmailVerify = (data: IRegisterData) => {
  return useHttp<BasicResp<null>>({
    url: `verify/v1/email/reg`,
    method: 'post',
    data: {
      ...data,
    },
  })
}
