import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Matches } from 'class-validator'

export class LoginDto {
  @IsNotEmpty({
    message: '用户名不能为空！'
  })
  @IsString({
    message: '用户名必须为字符串！'
  })
  @ApiProperty({ description: '用户名', required: true })
  name: string

  @IsNotEmpty({
    message: '密码不能为空！'
  })
  @IsString({
    message: '密码必须为字符串！'
  })
  @ApiProperty({ description: '密码', required: true })
  password: string
}
