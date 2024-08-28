import { IsNumber } from 'class-validator';

export class CreateBookingDto {
  @IsNumber({}, { each: true })
  departingFlights: number[];

  @IsNumber({}, { each: true })
  returningFlights: number[];

  @IsNumber()
  paymentMethodId: number;
}
