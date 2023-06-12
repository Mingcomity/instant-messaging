import MCRequest from './index'

interface RegisterLoginQueryType {
  name: string
  password: string
}

interface ResponseType<T> {
  succcess: boolean
  data: T
  status: number
  message: string
  time?: Date
  path?: string
}

interface ResponseRegisterLoginType {
  code?: number
  message?: string
}

export const RegisterApi = (data: RegisterLoginQueryType) =>
  MCRequest.post<ResponseType<ResponseRegisterLoginType>>('auth/register', data)

export const LoginApi = (data: RegisterLoginQueryType) =>
  MCRequest.post<ResponseType<ResponseRegisterLoginType>>('auth/login', data)
