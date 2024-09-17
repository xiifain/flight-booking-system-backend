import { Profile } from 'src/auth/profile.entity';
import { FlightInstance } from 'src/flights/flight-instance.entity';
import { Flight } from 'src/flights/flight.entity';
import { Payment } from 'src/payments/payment.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('bookings')
export class Booking extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 6, nullable: false })
  code: string;

  @ManyToMany(() => FlightInstance, flight => flight.id)
  @JoinTable({
    name: 'bookings_departing_flight_instances',
    joinColumn: { name: 'booking_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'flight_instance_id', referencedColumnName: 'id' },
  })
  departingFlights: FlightInstance[];

  @ManyToMany(() => FlightInstance, flight => flight.id)
  @JoinTable({
    name: 'bookings_returning_flight_instances',
    joinColumn: { name: 'booking_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'flight_instance_id', referencedColumnName: 'id' },
  })
  returningFlights: FlightInstance[];

  @ManyToOne(() => Payment, payment => payment.id)
  @JoinColumn({ name: 'payment_id' })
  payment: Payment;

  @ManyToOne(() => Profile, profile => profile.id)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;
}
