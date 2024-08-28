import { Airplane } from 'src/airplanes/airplane.entity';
import { Country } from 'src/countries/country.entity';
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

@Entity('airlines')
export class Airline extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 2, nullable: false, unique: true })
  code: string;

  @Column({ name: 'logo', type: 'varchar', length: 255, nullable: true })
  logo: string;

  @ManyToOne(() => Country, country => country.airlines, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @OneToMany(() => Airplane, airplane => airplane.airline)
  airplanes: Airplane[];

  @OneToMany(() => Flight, flight => flight.airline)
  flights: Flight[];
}
