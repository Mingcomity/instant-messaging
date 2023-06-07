import type {
  NestInterceptor,
  CallHandler,
  ExecutionContext
} from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import type { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

interface Data<T> {
  data: T
}

// 响应拦截器
@Injectable()
export class Response<T> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<Data<T>> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        return {
          succcess: true,
          data,
          status: 200,
          message: '请求成功！'
        }
      })
    )
  }
}
