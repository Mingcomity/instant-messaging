import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request
} from '@nestjs/common'
import { UserService } from './user.service'
import type { RequestSession } from 'src/type'
import { UpdateAvatatDto } from './dto/update-avater-user.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('user')
@ApiTags('用户')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  @ApiOperation({
    summary: '获取用户列表',
    description: '需要权限！'
  })
  async findAll() {
    return await this.userService.findAll()
  }

  @Get('info')
  @ApiOperation({
    summary: '获取登录用户信息',
    description: '需要权限！'
  })
  async findUserInfo(@Request() req: RequestSession) {
    return await this.userService.findUserInfo(req)
  }

  @Post('avatar')
  @ApiOperation({
    summary: '更新用户头像！',
    description: '需要权限！'
  })
  async updatedAvatar(
    @Body() Body: UpdateAvatatDto,
    @Request() req: RequestSession
  ) {
    return await this.userService.updatedAvatar(Body, req)
  }
}
