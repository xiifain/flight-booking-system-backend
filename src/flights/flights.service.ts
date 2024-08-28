import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Flight } from './flight.entity';
import { Brackets, Repository } from 'typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { FlightQueryDto, FlightResponseDto } from './flight.dtos';

@Injectable()
export class FlightsService {
  constructor(
    @InjectRepository(Flight)
    private readonly flightRepository: Repository<Flight>,
  ) {}

  async findAll(query: FlightQueryDto): Promise<Pagination<FlightResponseDto>> {
    const queryBuilder = this.flightRepository
      .createQueryBuilder('flight')
      .leftJoinAndSelect('flight.departureAirport', 'departureAirport')
      .leftJoinAndSelect('flight.destinationAirport', 'destinationAirport')
      .leftJoinAndSelect('departureAirport.city', 'departureCity')
      .leftJoinAndSelect('destinationAirport.city', 'destinationCity')
      .leftJoinAndSelect('flight.airplane', 'airplane')
      .leftJoinAndSelect('flight.airline', 'airline')
      .leftJoinAndSelect('airline.country', 'country');

    queryBuilder.where(
      new Brackets(qb => {
        qb.where('departureAirport.iataCode ILIKE(:origin)', { origin: query.origin });
        qb.orWhere('departureAirport.name ILIKE(:origin)', { origin: `%${query.origin}%` });
        qb.orWhere('departureCity.name ILIKE(:origin)', { origin: `%${query.origin}%` });
      }),
    );

    queryBuilder.andWhere(
      new Brackets(qb => {
        qb.where('destinationAirport.iataCode ILIKE(:destination)', {
          destination: query.destination,
        });
        qb.orWhere('destinationAirport.name ILIKE(:destination)', {
          destination: `%${query.destination}%`,
        });
        qb.orWhere('destinationCity.name ILIKE(:destination)', {
          destination: `%${query.destination}%`,
        });
      }),
    );

    queryBuilder.andWhere(':class = ANY(airplane.classes)', { class: query.class });
    queryBuilder.orderBy('flight.departureTime', 'ASC');

    const data = await paginate(queryBuilder, { limit: query.limit, page: query.page });

    if (data.items.length === 0) {
      return {
        ...data,
        items: [],
      };
    }

    // Mocking of one stop layover flights
    const layoverFlight: FlightResponseDto = {
      id: data.items[0].id + 100000,
      logo: data.items[0].airline.logo,
      flights: [data.items[0], data.items[1]],
      layovers: [
        {
          duration: 120,
          airport: {
            id: 1,
            name: 'Los Angeles International Airport',
            iataCode: 'LAX',
          },
        },
      ],
      totalPrice: data.items[0].price + data.items[1].price,
      totalCO2Emission: (
        parseFloat(data.items[0].emission) + parseFloat(data.items[1].emission)
      ).toString(),
      type: 'round-trip',
    };

    return {
      ...data,
      items: data.items
        .map(flight => {
          return {
            id: flight.id,
            logo: flight.airline.logo,
            flights: [flight],
            layovers: [],
            totalPrice: flight.price,
            totalCO2Emission: flight.emission,
            type: 'round-trip',
          } as FlightResponseDto;
        })
        .concat(layoverFlight),
    };
  }
}
