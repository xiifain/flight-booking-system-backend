import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './db/data-source';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SentryModule } from '@sentry/nestjs/setup';
import { AirportsModule } from './airports/airports.module';
import { CitiesModule } from './cities/cities.module';
import { CountriesModule } from './countries/countries.module';
import { AirlinesModule } from './airlines/airlines.module';
import { AirplanesModule } from './airplanes/airplanes.module';
import { FlightsModule } from './flights/flights.module';
import { BookingsModule } from './bookings/bookings.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    SentryModule.forRoot(),
    AuthModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    AirportsModule,
    CitiesModule,
    CountriesModule,
    AirlinesModule,
    AirplanesModule,
    FlightsModule,
    BookingsModule,
    PaymentsModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
