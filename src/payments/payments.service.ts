import { Logger, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { CreatePaymentDto } from './payment.dtos';

@Injectable()
export class PaymentsService {

  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async findAll(user: User): Promise<Payment[]> {
    return this.paymentRepository.find({ where: { profile: { id: user.profile.id } } });
  }

  async create(dto: CreatePaymentDto, user: User): Promise<Payment> {
    const data = await this.paymentRepository.save({ ...dto, profile: user.profile });

    this.logger.log(`${user.profile.id} created a new payment method with id - ${data.id}`);

    return data;
  }

  async delete(id: number, user: User): Promise<{ message: string }> {
    const payment = await this.paymentRepository.findOne({
      where: { id, profile: { id: user.profile.id } },
    });

    if (!payment) throw new NotFoundException('Payment not found');

    await this.paymentRepository.delete({ id });

    return { message: 'Payment deleted successfully' };
  }
}
