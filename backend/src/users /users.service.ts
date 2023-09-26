import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  public getAll() {
    return this.userModel.find().lean();
  }

  public findOne(data: any) {
    return this.userModel.findOne(data).lean();
  }

  public findByEmail(email: string) {
    return this.userModel.findOne({ email }).lean();
  }

  public async create(createUserDto: CreateUserDto) {
    // if (createUserDto.password !== createUserDto.confirmPassword) {
    //   throw new BadRequestException("Passwords don't match");
    // }
    return await this.userModel.create(createUserDto);
  }
}
