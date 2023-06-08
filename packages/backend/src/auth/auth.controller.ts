import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateAuthDto } from './dto/create-auth.dto'
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger'
import { LoginDto } from './dto/login.dto'

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

  @Post('/login')
  @ApiOperation({
    summary: '登录接口',
    description: '无需权限'
  })
  async AuthLogin(@Body() user: LoginDto, @Req() req) {
    return await this.authService.login(user, req)
  }
}
