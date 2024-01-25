import { Controller, UseGuards } from '@nestjs/common';
import { ComponentService } from './component.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@ApiTags('component')
@Controller('component')
export class ComponentController {
  constructor(private readonly componentService: ComponentService) {}
}
