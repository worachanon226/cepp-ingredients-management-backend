import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Member } from './schema/member.schema';
import { UserService } from '../user/user.service';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel(Member.name)
    private readonly memberModel: mongoose.Model<Member>,
    private readonly userService: UserService,
  ) {}

  async create(userId: string, restaurantId: string) {
    const createdMember = new this.memberModel({
      userId: userId,
      restaurantId: restaurantId,
    });
    return await createdMember.save();
  }

  async getUsersByRestaurantId(restaurantId: string) {
    const members = await this.findByRestaurantId(restaurantId);
    const userPromises = members.map(async (member) => {
      console.log(member);
      var user = await this.userService.getByIdReturnValidData(member.userId);
      console.log(user);
      return user;
    });
    const users = await Promise.all(userPromises);
    return users
  }

  async findByRestaurantId(restaurantId: string) {
    return await this.memberModel.find({ restaurantId: restaurantId });
  }

  async findByUserId(userId: string) {
    return await this.memberModel.find({ userId: userId });
  }

  async deleteUser(userId: string, restaurantId: string) {
    return await this.memberModel.findOneAndDelete({
      userId: userId,
      restaurantId: restaurantId,
    });
  }
}
