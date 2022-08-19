import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isError, string } from 'joi';
import { loginInfo } from '../interfaces/login-info.interface';
import { UserRepository } from '../interfaces/user-repository.interface';
import { SequelizeUsersRepository } from '../repositories/sequelize-users-repository';

@Injectable()
export class AuthService {
  constructor(
    private usersSequelizeService: SequelizeUsersRepository,
    private jwtService: JwtService
  ) {}

  async validateUser(userName: string, password: string): Promise<any> {
    const user = await this.usersSequelizeService.findOneForLogin(userName, password);
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginInfo: loginInfo) {
    const user = await this.usersSequelizeService.findOneForLogin( loginInfo.userName, loginInfo.password );
    const payload = { userName: loginInfo.userName, userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
