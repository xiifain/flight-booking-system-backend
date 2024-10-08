import { Airline } from 'src/airlines/airline.entity';
import { Airplane } from 'src/airplanes/airplane.entity';
import { Airport } from 'src/airports/airport.entity';
import { NumericTransformer } from 'src/utils/column-numeric-transformer';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Route } from './route.entity';
import { FlightInstance } from './flight-instance.entity';

@Entity('flights')
export class Flight extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'legroom', type: 'varchar', length: 100, nullable: true })
  legroom?: string;

  @Column({ name: 'emission', type: 'varchar', length: 100, nullable: true })
  emission?: string;

  @ManyToOne(() => Airline, airline => airline.flights)
  @JoinColumn({ name: 'airline_id' })
  airline: Airline;

  @ManyToOne(() => Airplane, airplane => airplane.flights)
  @JoinColumn({ name: 'airplane_id' })
  airplane: Airplane;

  @ManyToOne(() => Airport, airport => airport.departures)
  @JoinColumn({ name: 'departure_airport_id' })
  departureAirport: Airport;

  @ManyToOne(() => Airport, airport => airport.destinations)
  @JoinColumn({ name: 'destination_airport_id' })
  destinationAirport: Airport;

  @ManyToOne(() => Route, route => route.flights)
  @JoinColumn({ name: 'route_id' })
  route: Route;

  @Column({ name: 'operating_days', type: 'varchar', length: 255, nullable: true })
  operatingDays?: string;

  @OneToMany(() => FlightInstance, flightInstance => flightInstance.flight)
  flightInstances: FlightInstance[];
}
