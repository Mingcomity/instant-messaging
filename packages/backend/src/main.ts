import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express/interfaces'
// 文档
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
// 跨域
import * as cors from 'cors'
// 响应处理中间件
import { Response } from './common/response'
// 异常处理中间件
import { HttpFilter } from './common/filter'
// session
import * as session from 'express-session'
// 全局注册验证
import { ValidationPipe } from '@nestjs/common'

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
      name: 'session',
      rolling: true,
      cookie: { maxAge: 1000 * 60 * 60 } // 过期1小时
    })
  )

  app.useGlobalFilters(new HttpFilter())

  app.useGlobalInterceptors(new Response())

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(4500)
}
bootstrap()
