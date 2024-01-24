import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MemberService } from './member.service';
import { AuthGuard } from '../auth/guard/auth.guard';

@ApiTags('member')
@Controller('member')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Get('restaurant/:restaurantId')
  async findByRestaurantId(@Param('restaurantId') restaurantId: string) {
    return await this.memberService.findByRestaurantId(restaurantId);
  }

  @Get('user/:restaurantId')
  async getUsersByRestaurantId(@Param('restaurantId') restaurantId: string) {
    return await this.memberService.getUsersByRestaurantId(restaurantId);
  }
}
