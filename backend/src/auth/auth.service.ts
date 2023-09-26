import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users /users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  private async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async registerUser(createUserDto: CreateUserDto) {
    const user = {
      ...createUserDto,
      password: await this.hashPassword(createUserDto.password),
    };
    try {
      return await this.usersService.create(user);
    } catch (err) {
      throw new BadRequestException('something went wrong: ' + err);
    }
  }
}
