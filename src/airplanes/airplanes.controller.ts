import { Controller } from '@nestjs/common';
import { AirplanesService } from './airplanes.service';

@Controller('airplanes')
export class AirplanesController {
  constructor(private readonly airplanesService: AirplanesService) {}
}
