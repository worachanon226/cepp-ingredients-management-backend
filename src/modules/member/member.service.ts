import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Member } from './schema/member.schema';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel(Member.name)
    private readonly memberModel: mongoose.Model<Member>,
  ) {}

  async create(userId: string, restaurantId: string) {
    const createdMember = new this.memberModel({
      userId: userId,
      restaurantId: restaurantId,
    });
    return await createdMember.save();
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
