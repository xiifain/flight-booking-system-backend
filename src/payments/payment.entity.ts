import { Profile } from 'src/auth/profile.entity';
import { AppEncryptionTransformerConfig } from 'src/utils/encryption-config';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EncryptionTransformer } from 'typeorm-encrypted';

@Entity('payments')
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'is_default', type: 'boolean', default: true, nullable: false })
  isDefault: boolean;

  @ManyToOne(() => Profile, profile => profile.payments, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;

  @Column({
    name: 'cardholder_name',
    type: 'varchar',
    length: 255,
    nullable: false,
    transformer: new EncryptionTransformer(AppEncryptionTransformerConfig),
  })
  cardholderName: string;

  @Column({
    name: 'card_number',
    type: 'varchar',
    length: 255,
    nullable: false,
    transformer: new EncryptionTransformer(AppEncryptionTransformerConfig),
  })
  cardNumber: string;

  @Column({
    name: 'expiration_month',
    type: 'varchar',
    length: 255,
    nullable: false,
    transformer: new EncryptionTransformer(AppEncryptionTransformerConfig),
  })
  expirationMonth: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    transformer: new EncryptionTransformer(AppEncryptionTransformerConfig),
  })
  cvv: string;
}
