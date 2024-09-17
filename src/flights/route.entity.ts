import { Airport } from 'src/airports/airport.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Flight } from './flight.entity';

@Entity('routes')
export class Route {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Airport, airport => airport.originRoutes)
  @JoinColumn({ name: 'origin_airport_id' })
  originAirport: Airport;

  @ManyToOne(() => Airport, airport => airport.destinationRoutes)
  @JoinColumn({ name: 'destination_airport_id' })
  destinationAirport: Airport;

  @Column({ type: 'int', nullable: true })
  distance: number; // in kilometers

  @OneToMany(() => Flight, flight => flight.route)
  flights: Flight[];
}
