import useHttp from '@/api/useHttp'
import type { BasicResp } from '@/api/types'

/**
 * 用户登录接口
 */
export interface ILoginReqData {
  verify_id: string
  verify_str: string
  username: string
  email?: string
  password: string
}

export interface ILoginResData {
  info: IInfo
  token: string
}

export interface IInfo {
  id: number
  username: string
  role: string
  access_token: string
  email: string
  avatar: string
  vip_expiration: string
}

const reqUserLogin = (data: ILoginReqData) => {
  return useHttp<BasicResp<ILoginResData>>({
    url: `/user/v1/login`,
    method: 'post',
    data: {
      ...data,
    },
  })
}
/**
 * 用户注册接口
 */

export interface IRegisterData {
  verify_id: string
  verify_code: string
  username: string
  email: string
  email_verify: string
  password: string
}

export const reqUserRegister = (params: IRegisterData) => {
  return useHttp<BasicResp<null>>({
    url: `/user/v1`,
    method: 'post',
    data: {
      ...params,
    },
  })
}

export { reqUserLogin }
