import { OmitType } from '@nestjs/swagger';
import { Payment } from './payment.entity';

export class CreatePaymentDto extends OmitType(Payment, ['id']) {}
