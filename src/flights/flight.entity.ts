import { Airline } from 'src/airlines/airline.entity';
import { Airplane } from 'src/airplanes/airplane.entity';
import { Airport } from 'src/airports/airport.entity';
import { NumericTransformer } from 'src/utils/column-numeric-transformer';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ name: 'departure_time', type: 'time', nullable: false })
  departureTime: string;

  @ManyToOne(() => Airport, airport => airport.destinations)
  @JoinColumn({ name: 'destination_airport_id' })
  destinationAirport: Airport;

  @Column({ name: 'arrival_time', type: 'time', nullable: false })
  arrivalTime: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0.0,
    transformer: new NumericTransformer(),
  })
  price: number;
}
