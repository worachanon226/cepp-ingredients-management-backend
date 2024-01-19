import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../user/schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterUserDto } from './dto/auth-register.dto';
import { authConfig } from 'config/auth.config';
import { LoginUserDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
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

  async LoginUser(loginUserDto: LoginUserDto) {
    const user = await this.userModel.findOne({
      username: loginUserDto.username,
    });

    if (!user) {
      throw new HttpException(
        {
          message: 'User or Password incorrect.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const isMatch = await bcrypt.compare(loginUserDto.password, user.password);
    if (isMatch) {
    }
  }

  private generateAccessToken(userId: string) {}
}
