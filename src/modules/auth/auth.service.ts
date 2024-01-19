import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/user';
import { RegisterUserDto } from './dto/auth-login.dto';
import { authConfig } from 'config/auth.config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: mongoose.Model<User>,
  ) {}

  async registerUser(registerUserDto: RegisterUserDto) {
    const user = await this.userModel.findOne({
      username: registerUserDto.username,
    });

    try {
      if (!user) {
        const saltOrRounds = +authConfig().saltround;
        const hash = await bcrypt.hash(registerUserDto.password, saltOrRounds);

        (registerUserDto.password as string) = hash;
        const registedUser = new this.userModel(registerUserDto);
        await registedUser.save();
      } else {
        throw new HttpException(
          {
            message: 'username already exists.',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
        },
        error.status,
      );
    }
  }
}
