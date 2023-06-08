import { Injectable } from '@nestjs/common'
import { AuthService } from 'src/auth/auth.service'
import type { RequestSession } from 'src/type'
import { UpdateAvatatDto } from './dto/update-avater-user.dto'

@Injectable()
export class UserService {
  constructor(private readonly AuthService: AuthService) {}

  async findAll(): Promise<any> {
    return await this.AuthService.findAll()
  }

  async findUserInfo(req: RequestSession): Promise<any> {
    return await this.AuthService.findUserInfo(req)
  }

  async updatedAvatar({ avatar }: UpdateAvatatDto, req: RequestSession) {
    return await this.AuthService.updatedAvatar(avatar, req)
  }
}
