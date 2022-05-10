import useHttp from '@/api/useHttp'
import type { BasicResp } from '@/api/types'
import { isNumber } from 'lodash-es'

/**
 * 查询天气api
 * @param city
 */

export interface IWeatherData {
  errNo: string
  data: IData
}

export interface IData {
  weather: IWeather
}

export interface IWeather {
  setting: ISetting
  content: IContent
}

export interface ISetting {
  city: string
}

export interface IContent {
  week: string
  city: string
  today: IToday
  tomorrow: ITomorrow
  thirdday: IThirdday
  fourthday: IFourthday
  fifthday: IFifthday
  linkseven: string
  source: ISource
  cityname: string
  calendar: ICalendar
  currenttemp: string
  warning: IWarning
  pslink: string
  weatherType: string
  isauto: boolean
  ipcity: string
  province: string
}

export interface IToday {
  time: string
  date: string
  img: string[]
  condition: string
  wind: string
  temp: string
  link: string
  imgs: IImgs
  pm25: string
  pollution: string
  pm25url: string
}

export interface IImgs {
  0: string
  1: string
}

export interface ITomorrow {
  time: string
  date: string
  img: string[]
  condition: string
  wind: string
  temp: string
  link: string
  imgs: IImgs
  pm25: string
  pollution: string
  pm25url: string
}

export interface IThirdday {
  time: string
  date: string
  img: string[]
  condition: string
  wind: string
  temp: string
  link: string
  imgs: IImgs
  pm25: string
  pollution: string
  pm25url: string
}

export interface IFourthday {
  time: string
  date: string
  img: string[]
  condition: string
  wind: string
  temp: string
  link: string
  imgs: IImgs
}

export interface IFifthday {
  time: string
  date: string
  img: string[]
  condition: string
  wind: string
  temp: string
  link: string
  imgs: IImgs
}

export interface ISource {
  name: string
  url: string
}

export interface ICalendar {
  time: string
  lunar: string
  festival: boolean
  weatherSourceUrl: string
}

export interface IWarning {
  title: string
  color: string
  imgurl: string
  url: string
}

export const reqWeather = (city: string) => {
  return useHttp<BasicResp<string>>({
    url: `weather/v1?city=${encodeURIComponent(city)}`,
    method: 'get',
  })
}

/**
 * 请求新闻数据
 */

export const reqNews = () => {
  return useHttp<BasicResp<string>>({
    url: `news/v1`,
    method: 'get',
  })
}

/**
 * 请求最新的链接
 */
export interface INewLinksData {
  id: number
  icon: string
  box_id: number
  link: string
  title: string
  item_order: number
  description: string
  created_at: string
}

export const reqNewLinks = (userID: number, count = 20) => {
  return useHttp<BasicResp<INewLinksData[]>>({
    url: `/link/v1/latest/${userID}?`,
    method: `get`,
    params: {
      count,
    },
  })
}
