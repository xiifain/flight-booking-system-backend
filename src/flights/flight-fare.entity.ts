import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { FlightInstance } from './flight-instance.entity';
import { NumericTransformer } from 'src/utils/column-numeric-transformer';

@Entity('flight_fares')
export class FlightFare {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => FlightInstance, flightInstance => flightInstance.fares)
  @JoinColumn({ name: 'flight_instance_id' })
  flightInstance: FlightInstance;

  @Column({ type: 'varchar', length: 20 })
  class: string; // e.g., Economy, Business

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
