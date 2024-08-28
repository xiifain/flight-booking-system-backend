import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { RolesGuard } from 'src/utils/role.guard';
import { Roles } from 'src/utils/roles.decorator';
import { Role } from 'src/auth/profile.entity';
import { RequestUser } from 'src/utils/request-user';
import { User } from 'src/auth/user.entity';
import { CreateBookingDto } from './booking.dtos';

@Controller('bookings')
@Roles(Role.GENERAL_USER)
@UseGuards(RolesGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  findAll(@RequestUser() user: User) {
    return this.bookingsService.findAll(user);
  }

  @Post()
  create(@RequestUser() user: User, @Body() dto: CreateBookingDto) {
    return this.bookingsService.create(user, dto);
  }
}
