import { Injectable } from '@nestjs/common'
import { CreateAuthDto } from './dto/create-auth.dto'
import { HttpStatus } from '@nestjs/common'
import { UpdateAuthDto } from './dto/update-auth.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Users } from './entities/auth.entity'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcryptjs'
import { Request } from 'express'
interface SessionType {
  session: {
    status: string
    userInfo: Object
  }
}
type RequestSession = SessionType & Request

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private readonly user: Repository<Users>
  ) {}

  // 注册
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

  // 登录
  async login({ name, password }: CreateAuthDto, req: RequestSession) {
    const isUser = await this.validataUser(name, password)
    // 不存在则返回
    if (!isUser)
      return {
        code: 200,
        message: '请检查用户名或密码是否正确！'
      }
    // 设置 session.status 表示登录状态，并记录当前用户的信息
    req.session.status = 'Login Success'
    req.session.userInfo = isUser
    return {
      code: 200,
      message: '登录成功！'
    }
  }

  // 判断是否存在用户
  async validataUser(name: string, password: string): Promise<any> {
    const user = await this.user.findOne({
      where: { name }
    })
    if (!user) {
      return false
    }
    const pwdCompar = await bcrypt.compare(password, user.password)
    if (user && pwdCompar) {
      return user
    }
    return false
  }

  // 查询所有用户信息
  // async findAll(): Promise<any> {
  //   const res = await this.user.findAndCount()
  //   return {
  //     aaa: 'sss'
  //   }
  // }
}
