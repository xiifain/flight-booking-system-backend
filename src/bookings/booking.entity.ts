import { Profile } from 'src/auth/profile.entity';
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

  @ManyToMany(() => Flight, flight => flight.id)
  @JoinTable({
    name: 'bookings_departing_flights',
    joinColumn: { name: 'booking_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'flight_id', referencedColumnName: 'id' },
  })
  departingFlights: Flight[];

  @ManyToMany(() => Flight, flight => flight.id)
  @JoinTable({
    name: 'bookings_returning_flights',
    joinColumn: { name: 'booking_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'flight_id', referencedColumnName: 'id' },
  })
  returningFlights: Flight[];

  @ManyToOne(() => Payment, payment => payment.id)
  @JoinColumn({ name: 'payment_id' })
  payment: Payment;

  @ManyToOne(() => Profile, profile => profile.id)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;
}
