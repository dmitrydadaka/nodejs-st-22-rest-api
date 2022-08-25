import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isError, string } from 'joi';
import { loginInfo } from '../interfaces/login-info.interface';
import { UserRepository } from '../interfaces/user-repository.interface';
import { SequelizeUsersRepository } from '../repositories/sequelize-users-repository';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersSequelizeService: SequelizeUsersRepository,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersSequelizeService.findOneForLogin(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }


  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
