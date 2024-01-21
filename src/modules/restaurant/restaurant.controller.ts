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
import { Roles } from '../auth/decorator/role.decorator';
import { AllRole } from '../user/schema/user.schema';
import { RolesGuard } from '../auth/guard/role.guard';
import { MemberService } from '../member/member.service';
import { CurrentUser } from '../auth/decorator/currentuser.decorator';
import { IUser } from '../user/interface/user.interface';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('restaurant')
@Controller('restaurant')
export class RestaurantController {
  constructor(
    private readonly restaurantService: RestaurantService,
    private readonly memberService: MemberService,
  ) {}
  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return await this.restaurantService.findOneById(id);
  }

  @Post()
  @Roles(AllRole.OWNER)
  @UseGuards(AuthGuard, RolesGuard)
  async create(
    @CurrentUser() iuser: IUser,
    @Body() createrestaurantdto: CreateRestaurantDto,
  ) {
    const restaurant = await this.restaurantService.create(createrestaurantdto);
    await this.memberService.create(iuser.sub, restaurant.id);
    return restaurant;
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
