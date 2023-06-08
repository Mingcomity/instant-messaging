import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateAvatatDto {
  @IsNotEmpty({
    message: 'avatar值不能为空！'
  })
  @IsString({
    message: '值类型为字符串！'
  })
  @ApiProperty({ description: '头像地址', required: true })
  avatar: string
}
