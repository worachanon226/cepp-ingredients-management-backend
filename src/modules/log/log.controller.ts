import { Controller, UseGuards } from '@nestjs/common';
import { LogService } from './log.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@ApiTags('log')
@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}
}
