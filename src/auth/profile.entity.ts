import {
  BaseEntity,
  Check,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { EncryptionTransformer } from 'typeorm-encrypted';
import { AppEncryptionTransformerConfig } from 'src/utils/encryption-config';
import { createCheckEnum } from 'src/utils/create-check-enum';
import { Payment } from 'src/payments/payment.entity';

export enum Role {
  GENERAL_USER = 'GENERAL USER',
  ADMIN = 'ADMIN',
}

@Entity('profiles')
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 255,
    nullable: false,
    transformer: new EncryptionTransformer(AppEncryptionTransformerConfig),
  })
  email: string;

  @Column({
    name: 'first_name',
    type: 'varchar',
    length: 255,
    nullable: false,
    transformer: new EncryptionTransformer(AppEncryptionTransformerConfig),
  })
  firstName: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    length: 255,
    nullable: true,
    transformer: new EncryptionTransformer(AppEncryptionTransformerConfig),
  })
  lastName?: string;

  @Column({ name: 'role', type: 'varchar', length: 20, default: Role.GENERAL_USER })
  @Check(`role IN (${createCheckEnum(Role)})`)
  role: Role;

  @Column({ name: 'image', type: 'varchar', length: 255, nullable: true })
  image?: string;

  @OneToOne(() => User, user => user.profile)
  user: User;

  @OneToMany(() => Payment, payment => payment.profile)
  payments: Payment[];
}
