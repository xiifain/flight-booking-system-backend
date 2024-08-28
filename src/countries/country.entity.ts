import { Airline } from 'src/airlines/airline.entity';
import { City } from 'src/cities/city.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('countries')
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ name: 'iso_code', type: 'varchar', length: 10, nullable: false })
  isoCode: string;

  @OneToMany(() => City, city => city.country)
  cities: City[];

  @OneToMany(() => Airline, airline => airline.country)
  airlines: Airline[];
}
