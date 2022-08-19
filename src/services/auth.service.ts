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

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
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
