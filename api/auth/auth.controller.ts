import { Controller, Get, Request, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() body) {
    return await this.authService.login(body.username, body.password);
  }

  @Get('user')
  @UseGuards(AuthGuard())
  public async user(@Request() req) {
    return req.user;
  }

  @Post('register')
  public async register(@Body() body) {
    return true;
  }

}
