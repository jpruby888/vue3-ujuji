/*
接收到的响应格式
 */
export interface BasicResp<T> {
  code: number
  data: T
  msg: string
}
