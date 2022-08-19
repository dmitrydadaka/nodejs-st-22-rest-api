import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guards';
import { LocalAuthGuard } from '../guards/local-auth.guards';
import { loginInfo } from '../interfaces/login-info.interface';

@Controller()
export class AuthController {
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Body() loginInfo: loginInfo) {
        return loginInfo;
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
