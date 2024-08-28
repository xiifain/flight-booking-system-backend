import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { Roles } from 'src/utils/roles.decorator';
import { Role } from 'src/auth/profile.entity';
import { RolesGuard } from 'src/utils/role.guard';
import { Pagination } from 'nestjs-typeorm-paginate';
import { FlightQueryDto, FlightResponseDto } from './flight.dtos';
import { ApiTags } from '@nestjs/swagger';

@Controller('flights')
@ApiTags('Flights Search')
@Roles(Role.GENERAL_USER)
@UseGuards(RolesGuard)
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @Get()
  findAll(@Query() query: FlightQueryDto): Promise<Pagination<FlightResponseDto>> {
    return this.flightsService.findAll(query);
  }
}
