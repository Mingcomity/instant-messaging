import axios from 'axios'
import type {
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse
} from 'axios'

interface ResponseType<T = any> {
  succcess: boolean
  data: T
  status: number
  message: string
  time?: Date
  path?: string
}

const BASE_URL = process.env.NEXT_PUBLIC_HTTPAPIURL
const TIME_OUT = 1000 * 15

class MCRequest {
  private readonly instance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    // this.instance.defaults.withCredentials = true

    // 请求拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        return config
      }
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      (res: AxiosResponse<ResponseType>) => {
        return res
      }
    )
  }

  public request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 开始发起网络请求
      this.instance
        .request<T>(config)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  public get<T = any>(url: string, headers?: any): Promise<T> {
    return this.request<T>({ url, method: 'GET', headers })
  }

  public post<T = any>(url: string, data?: any, headers?: any): Promise<T> {
    return this.request<T>({ url, data, method: 'POST', headers })
  }
}

export default new MCRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})
