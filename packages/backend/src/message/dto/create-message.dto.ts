import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateMessageDto {
  @IsNotEmpty({
    message: '消息内容不能为空！'
  })
  @IsString({
    message: '消息内容必须为字符串！'
  })
  @ApiProperty({
    description: '消息内容',
    required: true
  })
  content: string

  @IsNotEmpty({
    message: '接收者昵称不能为空！'
  })
  @IsString({
    message: '昵称必须为字符串！'
  })
  @ApiProperty({
    description: '消息接收者',
    required: true
  })
  receiver: string
}
