import { Logger, Injectable } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { CreateBookingDto } from './booking.dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { Repository } from 'typeorm';
import { generateRandomString } from 'src/utils/random-string-generator';
import { FlightInstance } from 'src/flights/flight-instance.entity';

@Injectable()
export class BookingsService {
  private readonly logger = new Logger(BookingsService.name);

  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async create(user: User, dto: CreateBookingDto) {
    const code = generateRandomString(6);

    const data = await this.bookingRepository.save({
      ...dto,
      code,
      departingFlights: dto.departingFlights.map(id => ({ id }) as FlightInstance),
      returningFlights: dto.returningFlights.map(id => ({ id }) as FlightInstance),
      payment: { id: dto.paymentMethodId },
      profile: user.profile,
    });

    this.logger.log(`${user.profile.id} created a booking with booking number - ${code}`);

    return data;
  }

  async findAll(user: User): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: { profile: { id: user.profile.id } },
      order: {
        departingFlights: {
          flight: {
            id: 'ASC',
          },
        },
      },
      relations: {
        departingFlights: {
          flight: {
            airline: true,
            airplane: true,
            departureAirport: true,
            destinationAirport: true,
          },
        },
        returningFlights: {
          flight: {
            airline: true,
            airplane: true,
            departureAirport: true,
            destinationAirport: true,
          },
        },
        payment: true,
      },
    });
  }
}
