import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Roles } from 'src/utils/roles.decorator';
import { Role } from 'src/auth/profile.entity';
import { RolesGuard } from 'src/utils/role.guard';
import { FlightQueryDto, MultiLegFlightResultDto } from './flight.dtos';
import { ApiTags } from '@nestjs/swagger';
import { FlightSearchService } from './flights.service';

@Controller('flights')
@ApiTags('Flights Search')
@Roles(Role.GENERAL_USER)
@UseGuards(RolesGuard)
export class FlightsController {
  constructor(private readonly flightsService: FlightSearchService) {}

  @Get()
  async findAll(@Query() query: FlightQueryDto): Promise<{
    outboundFlights: MultiLegFlightResultDto[];
    returnFlights?: MultiLegFlightResultDto[];
  }> {
    const outboundFlights = await this.flightsService.searchFlights(query);

    let returnFlights: MultiLegFlightResultDto[] = [];

    if (query.returnDate) {
      returnFlights = await this.flightsService.searchReturnFlights(query);
    }

    return {
      outboundFlights,
      returnFlights,
    };
  }
}
