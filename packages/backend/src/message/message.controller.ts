import { Controller, Post, Body, Request, Get, Query } from '@nestjs/common'
import { MessageService } from './message.service'
import { FindMessageDto } from './dto/find-message.dto'
import { CreateMessageDto } from './dto/create-message.dto'
import { UpdateMessageDto } from './dto/update-message.dto'
import { RequestSession } from 'src/type'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@Controller('message')
@ApiTags('消息')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('send')
  @ApiOperation({
    summary: '发送消息',
    description: '需要权限'
  })
  async create(
    @Body() createMessageDto: CreateMessageDto,
    @Request() req: RequestSession
  ) {
    return await this.messageService.createMessage(createMessageDto, req)
  }

  @Get('list')
  @ApiOperation({
    summary: '查询消息列表',
    description: '需要权限'
  })
  async findAll(
    @Query() findMessageDto: FindMessageDto,
    @Request() req: RequestSession
  ) {
    return await this.messageService.findMessageList(findMessageDto, req)
  }
}
