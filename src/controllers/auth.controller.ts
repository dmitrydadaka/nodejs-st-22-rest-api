import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guards';
import { LocalAuthGuard } from '../guards/local-auth.guards';
import { loginInfo } from '../interfaces/login-info.interface';
import { AuthService } from '../services/auth.service';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }
    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
