import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { RequestUser } from 'src/utils/request-user';
import { User } from 'src/auth/user.entity';
import { RolesGuard } from 'src/utils/role.guard';
import { Roles } from 'src/utils/roles.decorator';
import { Role } from 'src/auth/profile.entity';
import { CreatePaymentDto } from './payment.dtos';

@Controller('payments')
@UseGuards(RolesGuard)
@Roles(Role.GENERAL_USER)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  findAll(@RequestUser() user: User) {
    return this.paymentsService.findAll(user);
  }

  @Post()
  create(@Body() dto: CreatePaymentDto, @RequestUser() user: User) {
    return this.paymentsService.create(dto, user);
  }

  @Delete(':id')
  delete(@RequestUser() user: User, @Param('id') id: number) {
    return this.paymentsService.delete(id, user);
  }
}
