import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { DateTransformer, TrimTransformer } from 'src/utils/custom-transformers';
import { PaginationFilter } from 'src/utils/pagination-filter';
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
  @DateTransformer()
  @IsOptional()
  returnDate?: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @TrimTransformer()
  travelClass: string;
}

export class FlightResultDto {
  id: number;
  logo: string;
  code: string;
  airlineName: string;
  originAirportCode: string;
  destinationAirportCode: string;
  departureTime: Date;
  arrivalTime: Date;
  duration: number; // in minutes
  fareClass: string;
  price: number;
}

export class MultiLegFlightResultDto {
  id: string;
  totalDuration: number; // in minutes
  logo: string;
  totalPrice: number;
  stops: number;
  flights: FlightResultDto[];
}
