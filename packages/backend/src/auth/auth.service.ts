import { Injectable } from '@nestjs/common'
import { CreateAuthDto } from './dto/create-auth.dto'
import { HttpStatus } from '@nestjs/common'
import { UpdateAuthDto } from './dto/update-auth.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Users } from './entities/auth.entity'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private readonly user: Repository<Users>
  ) {}

  async register({ name, password }: CreateAuthDto) {
    // 查询是否用户名重复
    const existUser = await this.user.findOne({
      where: { name }
    })

    if (existUser) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: '用户已存在！'
      }
    }

    const hashPwd = await bcrypt.hashSync(password)

    await this.user.save({ name, password: hashPwd })

    return {
      code: 200,
      message: '用户注册成功！'
    }
  }
}
