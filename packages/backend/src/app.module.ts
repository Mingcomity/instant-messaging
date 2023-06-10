import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module'
import { EventsGateway } from './events/events.gateway'
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'root',
      password: 'admin123',
      host: 'localhost',
      port: 3306,
      database: 'instant_msg',
      synchronize: true,
      retryDelay: 500,
      retryAttempts: 10,
      autoLoadEntities: true
    }),
    AuthModule,
    UserModule,
    EventsGateway,
    MessageModule
  ],
  controllers: [AppController],
  providers: [AppService, EventsGateway]
})
export class AppModule {}
