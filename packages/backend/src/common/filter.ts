import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException
} from '@nestjs/common'

import { Request, Response } from 'express'

// 异常拦截器
@Catch()
export class HttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()

    const request = ctx.getRequest<Request>()

    const response = ctx.getResponse<Response>()

    const status = exception.getStatus()

    const message = exception.message

    response.status(status).json({
      succcess: false,
      time: new Date(),
      path: request.url,
      data: exception,
      status,
      message
    })
  }
}
