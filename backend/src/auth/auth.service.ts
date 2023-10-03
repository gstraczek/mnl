import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users /users.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async registerUser(createUser: CreateUserDto) {
    const user = {
      ...createUser,
      password: await this.hashPassword(createUser.password),
    };
    try {
      return await this.usersService.create(user);
    } catch (err) {
      throw new BadRequestException('something went wrong: ' + err);
    }
  }

  async validateUser(loginUser: LoginUserDto) {
    const user = {
      ...loginUser,
      password: await this.hashPassword(loginUser.password),
    };
    try {
      const foundUser = await this.usersService.findOne({ email: user.email });
      const isPasswordValid = await bcrypt.compare(
        loginUser.password,
        foundUser.password,
      );
      if (isPasswordValid) return foundUser;
      else return null;
    } catch (err) {
      throw new BadRequestException('something went wrong: ' + err);
    }
  }
}
