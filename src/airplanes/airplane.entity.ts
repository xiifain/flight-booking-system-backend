import { Airline } from 'src/airlines/airline.entity';
import { Flight } from 'src/flights/flight.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('airplanes')
export class Airplane extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10, nullable: false })
  code: string;

  @Column({ name: 'type', type: 'varchar', length: 50, nullable: false })
  type: string;

  @Column({ name: 'classes', type: 'text', array: true, default: [] })
  classes: string[];

  @ManyToOne(() => Airline, airline => airline.airplanes, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'airline_id' })
  airline: Airline;

  @OneToMany(() => Flight, flight => flight.airplane)
  flights: Flight[];
}
