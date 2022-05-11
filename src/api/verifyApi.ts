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

/**
 * 更新密码
 */

export interface IFindPassParams {
  email: string
  verify_code: string
  verify_id: string
}
// 1.获取邮箱验证码
export const reqFindPassEmailVerify = (params: IFindPassParams) => {
  return useHttp<BasicResp<null>>({
    url: `/verify/v1/email/find_pass`,
    method: 'post',
    data: {
      ...params,
    },
  })
}

// 2.更新密码
export interface IUpdatePassParams2 {
  email: string
  email_code: string
  verify_code: string
  password: string
  verify_id: string
}
export const reqUpdatePassword = (params: IUpdatePassParams2) => {
  return useHttp<BasicResp<null>>({
    url: '/user/v1/update_pass/email',
    method: 'post',
    data: {
      ...params,
    },
  })
}
