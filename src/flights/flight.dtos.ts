import { IsDateString, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { DateTransformer, TrimTransformer } from 'src/utils/custom-transformers';
import { PaginationFilter } from 'src/utils/pagination-filter';
import { Flight } from './flight.entity';
import { Airport } from 'src/airports/airport.entity';
import { ApiProperty } from '@nestjs/swagger';

export class FlightQueryDto extends PaginationFilter {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @TrimTransformer()
  origin: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @TrimTransformer()
  destination: string;

  @ApiProperty()
  @IsNotEmpty()
  @DateTransformer()
  departureDate: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @TrimTransformer()
  class: string;
}

export class LayOver {
  // duration in minutes
  duration: number;

  airport: Partial<Airport>;
}

export class FlightResponseDto {
  id: number;
  logo?: string;
  flights: Flight[];
  layovers: LayOver[];
  totalPrice: number;
  totalCO2Emission: string;
  type: string;
}
