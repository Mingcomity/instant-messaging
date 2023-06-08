import { Request } from 'express'
interface SessionType {
  session: {
    status: string
    userInfo: any
  }
}
export type RequestSession = SessionType & Request
