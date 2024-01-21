import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guard/auth.guard';
import { CreateRestaurantDto, UpdateRestaurantDto } from './dto/restaurant.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('restaurant')
@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}
  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return await this.restaurantService.findOneById(id);
  }

  @Post()
  async create(@Body() createrestaurantdto: CreateRestaurantDto) {
    return await this.restaurantService.create(createrestaurantdto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updaterestaurantdto: UpdateRestaurantDto,
  ) {
    return await this.restaurantService.update(id, updaterestaurantdto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.restaurantService.delete(id);
  }
}
