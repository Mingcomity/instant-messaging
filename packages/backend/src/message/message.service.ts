import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateMessageDto } from './dto/create-message.dto'
import { UpdateMessageDto } from './dto/update-message.dto'
import { Message } from './entities/message.entity'
import { FindMessageDto } from './dto/find-message.dto'
import { RequestSession } from 'src/type'

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private readonly messageDb: Repository<Message>
  ) {}

  async createMessage(
    { content, receiver }: CreateMessageDto,
    req: RequestSession
  ) {
    const sender = req.session.userInfo.name
    await this.messageDb.save({ sender, content, receiver })
    return {
      code: 200,
      message: '发送成功！'
    }
  }

  async findMessageList({ receiver }: FindMessageDto, req: RequestSession) {
    const sender = req.session.userInfo.name
    const res1 = await this.messageDb.find({
      where: {
        sender,
        receiver
      }
    })
    const res2 = await this.messageDb.find({
      where: {
        sender: receiver,
        receiver: sender
      }
    })
    return {
      code: 200,
      message: '查询成功！',
      data: [...res1, ...res2].sort((a, b) => a.id - b.id)
    }
  }
}
