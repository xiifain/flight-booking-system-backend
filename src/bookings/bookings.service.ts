import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { CreateBookingDto } from './booking.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { Repository } from 'typeorm';
import { Flight } from 'src/flights/flight.entity';
import { generateRandomString } from 'src/utils/random-string-generator';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async create(user: User, dto: CreateBookingDto) {
    const code = generateRandomString(6);

    return this.bookingRepository.save({
      ...dto,
      code,
      departingFlights: dto.departingFlights.map(id => ({ id }) as Flight),
      returningFlights: dto.returningFlights.map(id => ({ id }) as Flight),
      payment: { id: dto.paymentMethodId },
      profile: user.profile,
    });
  }

  async findAll(user: User): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: { profile: { id: user.profile.id } },
      relations: {
        departingFlights: {
          departureAirport: true,
          destinationAirport: true,
        },
        returningFlights: {
          departureAirport: true,
          destinationAirport: true,
        },
        payment: true,
      },
    });
  }
}
