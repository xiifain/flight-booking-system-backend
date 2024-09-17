import { Module } from '@nestjs/common';
import { FlightsController } from './flights.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightSearchService } from './flights.service';
import { FlightInstance } from './flight-instance.entity';
import { Airport } from 'src/airports/airport.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FlightInstance, Airport])],
  controllers: [FlightsController],
  providers: [FlightSearchService],
})
export class FlightsModule {}
