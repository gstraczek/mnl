import { Body, Controller, Post, Req, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async login(
    @Req() req: Request,
    @Body(new ValidationPipe()) body: CreateUserDto,
  ) {
    await this.authService.registerUser(body);
  }
}
