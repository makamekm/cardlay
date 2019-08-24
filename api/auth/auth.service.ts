import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(username: string, password: string) {
    if (!username || password !== '123') {
      throw new BadRequestException('Username & password are miss match');
    }
    const email = 'test@test.com';
    const token = await this.jwtService.signAsync({
      username,
      email,
    });
    return {
      token,
      username,
      email,
    };
  }

  async logout(token: string) {
    const user = await this.jwtService.verifyAsync(token);
    return !!user;
  }

  async user(token: string) {
    return await this.jwtService.verifyAsync(token);
  }

  async validate(payroll) {
    return {
      username: payroll.username,
      email: payroll.email,
    };
  }
}
