import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateAuthDto } from './dto/create-auth.dto'
import { UpdateAuthDto } from './dto/update-auth.dto'
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger'

@Controller('auth')
@ApiTags('登录or注册')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiOperation({
    summary: '注册接口',
    description: '无需权限'
  })
  async AuthRegister(@Body() user: CreateAuthDto) {
    return await this.authService.register(user)
  }
}
