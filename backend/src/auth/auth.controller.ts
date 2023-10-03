import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from './local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body(new ValidationPipe()) body: CreateUserDto) {
    await this.authService.registerUser(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login() {
    try {
      return { msg: 'User logged in' };
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  @Get('me')
  async me(@Req() req: Request) {
    console.log(req.user);
    return req.user ? req.user : 'e';
  }
}
