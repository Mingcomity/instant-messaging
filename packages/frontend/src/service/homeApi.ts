import { type } from 'os'
import MCRequest from './index'

export type ReturnUserListType = Array<{
  id: number
  name: string
  avatar: string
}>

export type ReturnUserInfoType = {
  id: number
  name: string
  avatar: string
}

export type ReturnMessageListType = Array<{
  id: number
  content: string
  sender: string
  receiver: string
}>

interface ResponseType<T = any> {
  succcess: boolean
  data: {
    code: number
    message: string
    data: T
  }
  status: number
  message: string
  time?: Date
  path?: string
}

interface UpdateAtavaType {
  avatar: string
}

interface SendMessageType {
  content: string
  receiver: string
}

// 获取用户列表
export const getUserListAPi = (headers: any) =>
  MCRequest.get<ResponseType<ReturnUserListType>>('user/all', headers)

// 获取用户信息
export const getUserInfoApi = (headers?: any) =>
  MCRequest.get<ResponseType<ReturnUserInfoType>>('user/info', headers)

// 更新用户头像
export const updateAtavarApi = (data: UpdateAtavaType) =>
  MCRequest.post('user/avatar', data)

// 发送消息
export const sendMessageApi = (data: SendMessageType) =>
  MCRequest.post('message/send', data)

// 获取消息列表
export const getMessageList = (receiver: string,headers?:any) =>
  MCRequest.get<ResponseType<ReturnMessageListType>>(`message/list?receiver=${receiver}`,headers)
