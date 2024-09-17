import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { FlightInstance } from './flight-instance.entity';
import { FlightQueryDto, FlightResultDto, MultiLegFlightResultDto } from './flight.dtos';
import { Airport } from 'src/airports/airport.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FlightSearchService {
  constructor(
    @InjectRepository(FlightInstance)
    private flightInstanceRepository: Repository<FlightInstance>,

    @InjectRepository(Airport)
    private readonly airportRepository: Repository<Airport>,
  ) {}

  async searchFlights(searchParams: FlightQueryDto): Promise<MultiLegFlightResultDto[]> {
    const { origin, destination, departureDate, travelClass } = searchParams;

    const originAirport = await this.airportRepository.findOne({
      where: [
        {
          iataCode: origin,
        },
        {
          city: {
            name: ILike(`%${origin}%`),
          },
        },
        {
          name: ILike(`%${origin}%`),
        },
      ],
    });

    const destinationAirport = await this.airportRepository.findOne({
      where: [
        {
          iataCode: destination,
        },
        {
          city: {
            name: ILike(`%${destination}%`),
          },
        },
        {
          name: ILike(`%${destination}%`),
        },
      ],
    });

    // Parse departure date
    const departureStart = new Date(departureDate);
    departureStart.setHours(0, 0, 0, 0);

    const departureEnd = new Date(departureDate);
    departureEnd.setHours(23, 59, 59, 999);

    // Start the recursive search with a default maximum depth to prevent infinite recursion
    const maxDepth = 3; // Set a reasonable limit to prevent performance issues

    const itineraries = await this.findFlightsRecursive({
      currentAirportId: originAirport.id,
      destinationAirportId: destinationAirport.id,
      departureStart,
      departureEnd,
      travelClass,
      visitedAirports: new Set<number>([originAirport.id]),
      currentItinerary: [],
      depth: 0,
      maxDepth,
    });

    // Map the results to DTOs
    const results: MultiLegFlightResultDto[] = itineraries.map(itinerary => {
      const totalDuration =
        (itinerary[itinerary.length - 1].arrivalTime.getTime() -
          itinerary[0].departureTime.getTime()) /
        60000; // in minutes
      const totalPrice = itinerary.reduce((sum, leg) => sum + leg.price, 0);

      return {
        id: uuid(),
        logo: itinerary[0].logo,
        totalDuration,
        totalPrice,
        stops: itinerary.length - 1,
        flights: itinerary,
      };
    });

    // Sort the results (e.g., by total price)
    results.sort((a, b) => a.totalPrice - b.totalPrice);

    return results;
  }

  private async findFlightsRecursive(params: {
    currentAirportId: number;
    destinationAirportId: number;
    departureStart: Date;
    departureEnd: Date;
    travelClass?: string;
    visitedAirports: Set<number>;
    currentItinerary: FlightResultDto[];
    depth: number;
    maxDepth: number;
  }): Promise<FlightResultDto[][]> {
    const {
      currentAirportId,
      destinationAirportId,
      departureStart,
      departureEnd,
      travelClass,
      visitedAirports,
      currentItinerary,
      depth,
      maxDepth,
    } = params;

    const itineraries: FlightResultDto[][] = [];

    // Base case: if depth exceeds maxDepth, return empty array
    if (depth > maxDepth) {
      return itineraries;
    }

    // Query for flight instances from currentAirportId
    const flightInstances = await this.flightInstanceRepository
      .createQueryBuilder('flightInstance')
      .leftJoinAndSelect('flightInstance.flight', 'flight')
      .leftJoinAndSelect('flight.departureAirport', 'flightDepartureAirport')
      .leftJoinAndSelect('flight.destinationAirport', 'flightDestinationAirport')
      .leftJoinAndSelect('flight.route', 'route')
      .leftJoinAndSelect('flight.airline', 'airline')
      .leftJoinAndSelect('flight.airplane', 'airplane')
      .leftJoinAndSelect('route.originAirport', 'originAirport')
      .leftJoinAndSelect('route.destinationAirport', 'destinationAirport')
      .leftJoinAndSelect('flightInstance.fares', 'fare')
      .where('flight.departureAirport.id = :currentAirportId', { currentAirportId })
      .andWhere('flightInstance.departureTime BETWEEN :departureStart AND :departureEnd', {
        departureStart,
        departureEnd,
      })
      .andWhere(travelClass ? 'fare.class = :travelClass' : '1=1', {
        travelClass,
      })
      .orderBy('flightInstance.departureTime', 'ASC')
      .getMany();

    for (const flightInstance of flightInstances) {
      const destinationId = flightInstance.flight.destinationAirport.id;

      // Skip if we've already visited this airport (to avoid cycles)
      if (visitedAirports.has(destinationId)) {
        continue;
      }

      // Map flight instance to FlightResultDto
      const fare = flightInstance.fares.find(f => !travelClass || f.class === travelClass);

      if (!fare) {
        continue;
      }

      const duration =
        (flightInstance.arrivalTime.getTime() - flightInstance.departureTime.getTime()) / 60000; // in minutes

      const flightResult: FlightResultDto = {
        id: flightInstance.id,
        logo: flightInstance.flight.airline.logo,
        code: flightInstance.flight.airplane.code,
        airlineName: flightInstance.flight.airline.name,
        originAirportCode: flightInstance.flight.departureAirport.iataCode,
        destinationAirportCode: flightInstance.flight.destinationAirport.iataCode,
        departureTime: flightInstance.departureTime,
        arrivalTime: flightInstance.arrivalTime,
        duration: duration,
        fareClass: fare.class,
        price: fare.price,
      };

      // Check if this flight reaches the destination
      if (destinationId === destinationAirportId) {
        // Construct the complete itinerary
        const itinerary = [...currentItinerary, flightResult];
        itineraries.push(itinerary);
      } else {
        // Prepare for the next leg
        const newVisitedAirports = new Set(visitedAirports);
        newVisitedAirports.add(destinationId);

        // Recursive call to find the next leg
        const nextLegItineraries = await this.findFlightsRecursive({
          currentAirportId: destinationId,
          destinationAirportId,
          departureStart: flightInstance.arrivalTime, // Next leg departs after arrival
          departureEnd: new Date(departureEnd.getTime() + 24 * 60 * 60 * 1000), // Allow up to 24 hours for connections
          travelClass,
          visitedAirports: newVisitedAirports,
          currentItinerary: [...currentItinerary, flightResult],
          depth: depth + 1,
          maxDepth,
        });

        itineraries.push(...nextLegItineraries);
      }
    }

    return itineraries;
  }

  // Search for return flights if returnDate is provided
  async searchReturnFlights(searchParams: FlightQueryDto): Promise<MultiLegFlightResultDto[]> {
    if (!searchParams.returnDate) {
      return [];
    }

    const { origin, destination, returnDate, travelClass, page, limit } = searchParams;

    // Swap origin and destination for return flight
    const returnSearchParams: FlightQueryDto = {
      origin: destination,
      destination: origin,
      departureDate: returnDate,
      travelClass,
      page,
      limit,
    };

    return this.searchFlights(returnSearchParams);
  }
}
