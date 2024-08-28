import { City } from 'src/cities/city.entity';
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

@Entity('airports')
export class Airport extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ name: 'iata_code', type: 'varchar', length: 3, nullable: false })
  iataCode: string;

  @ManyToOne(() => City, city => city.airports)
  @JoinColumn({ name: 'city_id' })
  city: City;

  @OneToMany(() => Flight, flight => flight.departureAirport)
  departures: Flight[];

  @OneToMany(() => Flight, flight => flight.destinationAirport)
  destinations: Flight[];
}
