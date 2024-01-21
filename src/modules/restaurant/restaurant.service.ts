import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { Restaurant } from './schema/restaurant.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRestaurantDto, UpdateRestaurantDto } from './dto/restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: mongoose.Model<Restaurant>,
  ) {}

  async create(creatRestaurantDto: CreateRestaurantDto) {
    const createdRestaurant = new this.restaurantModel(creatRestaurantDto);
    await createdRestaurant.save();
  }

  async findOneById(restaurantId: string) {
    return await this.restaurantModel.findById(restaurantId);
  }

  async update(restaurantId: string, updaterestaurantDto: UpdateRestaurantDto) {
    return await this.restaurantModel.findByIdAndUpdate(
      restaurantId,
      updaterestaurantDto,
      {
        new: true,
      },
    );
  }

  async delete(restaurantId: string) {
    return await this.restaurantModel.findByIdAndDelete(restaurantId);
  }
}
