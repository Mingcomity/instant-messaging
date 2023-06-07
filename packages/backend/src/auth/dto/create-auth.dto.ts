import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Matches } from 'class-validator'

export class CreateAuthDto {
  @IsNotEmpty({
    message: '用户名不能为空！'
  })
  @IsString({
    message: '用户名必须为字符串！'
  })
  @Matches(/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/, {
    message: '用户名需要以字母开头，长度在6-18之间，只能包含字母数字下划线!'
  })
  @ApiProperty({ description: '用户名' })
  name: string

  @IsNotEmpty({
    message: '密码不能为空！'
  })
  @IsString({
    message: '密码必须为字符串！'
  })
  @Matches(/^[a-zA-Z]\w{5,17}$/, {
    message: '密码需以字母开头，长度在6~18之间，只能包含字母、数字和下划线!'
  })
  @ApiProperty({ description: '密码' })
  password: string
}
