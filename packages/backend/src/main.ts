import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express/interfaces'
import type { RequestSession } from 'src/type'
import { Response, NextFunction } from 'express'
// 文档
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
// 跨域
import * as cors from 'cors'
// 响应处理中间件
import { Response as ResponseMiddle } from './common/response'
// 异常处理中间件
import { HttpFilter } from './common/filter'
// session
import * as session from 'express-session'
// session-file-store
import * as FileStore from 'session-file-store'
// 全局注册验证
import { HttpException, ValidationPipe, HttpStatus } from '@nestjs/common'

const authRouter = ['/auth/register', '/auth/login']
// Session 登录验证
function MiddleWareSession(
  req: RequestSession,
  res: Response,
  next: NextFunction
) {
  if (authRouter.includes(req.originalUrl)) {
    if (req.session.status) {
      next()
    } else {
      throw new HttpException(
        '用户认证失败，请重新登录！',
        HttpStatus.UNAUTHORIZED
      )
    }
  } else {
    next()
  }
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  const options = new DocumentBuilder()
    .setTitle('即时通讯系统——API接口文档')
    .setDescription('不知道描述啥')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('/api-docs', app, document)

  app.use(cors())

  app.use(
    session({
      secret: 'Mingcomity',
      resave: false,
      saveUninitialized: false,
      name: 'session',
      rolling: true,
      cookie: { maxAge: 1000 * 60 * 60 * 4, secure: false, httpOnly: true }, // 过期4小时
      store: new (FileStore(session))()
    })
  )

  app.useGlobalFilters(new HttpFilter())

  app.useGlobalInterceptors(new ResponseMiddle())

  app.useGlobalPipes(new ValidationPipe())

  // app.use(MiddleWareSession)

  await app.listen(4500)
}
bootstrap()
