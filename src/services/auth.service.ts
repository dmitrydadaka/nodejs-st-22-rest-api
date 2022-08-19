import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { loginInfo } from '../interfaces/login-info.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(id: string): Promise<any> {
    const user = await this.usersService.findOne(id);
    if (user && user.id === id) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginInfo: loginInfo) {
    const payload = { userName: loginInfo.userName, password: loginInfo.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
