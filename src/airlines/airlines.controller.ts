import { Controller } from '@nestjs/common';
import { AirlinesService } from './airlines.service';

@Controller('airlines')
export class AirlinesController {
  constructor(private readonly airlinesService: AirlinesService) {}
}
