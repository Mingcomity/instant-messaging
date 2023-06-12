import { Injectable } from '@nestjs/common'
import { CreateAuthDto } from './dto/create-auth.dto'
import { HttpStatus } from '@nestjs/common'
import { UpdateAuthDto } from './dto/update-auth.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Users } from './entities/auth.entity'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcryptjs'
import type { RequestSession } from 'src/type'

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
        code: 1001,
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
        code: 1002,
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
  async validataUser(name: string, userPassword: string): Promise<any> {
    const user = await this.user
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.name=:name', { name })
      .getOne()
    if (!user) {
      return false
    }
    const { password, ...userInfo } = user
    const pwdCompar = await bcrypt.compare(userPassword, password)
    if (user && pwdCompar) {
      return userInfo
    }
    return false
  }

  // 查询所有用户信息
  async findAll(): Promise<any> {
    const res = await this.user.find()
    return {
      code: 200,
      data: res,
      message: '获取用户信息成功！'
    }
  }

  // 查询当前用户信息
  async findUserInfo(req: RequestSession): Promise<any> {
    return {
      code: 200,
      data: req.session.userInfo,
      message: '获取用户信息成功！'
    }
  }

  // 修改当前用户头像
  async updatedAvatar(avatar: string, req: RequestSession): Promise<any> {
    await this.user
      .createQueryBuilder('user')
      .update()
      .set({ avatar })
      .where('id=:id', { id: req.session.userInfo.id })
      .execute()
    return {
      code: 200,
      message: '更新成功！'
    }
  }
}
