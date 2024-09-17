import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Flight } from './flight.entity';
import { FlightFare } from './flight-fare.entity';

@Entity('flight_instances')
export class FlightInstance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Flight, flight => flight.flightInstances)
  @JoinColumn({ name: 'flight_id' })
  flight: Flight;

  @Column({ type: 'timestamp' })
  departureTime: Date;

  @Column({ type: 'timestamp' })
  arrivalTime: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  status: string;

  @OneToMany(() => FlightFare, fare => fare.flightInstance)
  fares: FlightFare[];
}
