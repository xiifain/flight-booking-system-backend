import {
  BaseEntity,
  Check,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Profile } from './profile.entity';
import { createCheckEnum } from 'src/utils/create-check-enum';

export enum UserType {
  APP = 'APP',
  GOOGLE = 'GOOGLE',
}

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // user_name will be empty when it's a google user
  @Column({ name: 'user_name', type: 'varchar', length: 20, nullable: true })
  userName?: string;

  // password will be null when it's a google user
  @Column({ name: 'password', type: 'varchar', length: 255, nullable: true })
  @Exclude()
  password?: string;

  @Column({ name: 'type', type: 'varchar', length: 20, default: UserType.APP })
  @Check(`type IN (${createCheckEnum(UserType)})`)
  type: UserType;

  @OneToOne(() => Profile, profile => profile.user, { nullable: false })
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;
}
