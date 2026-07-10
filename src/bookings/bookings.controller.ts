import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';

import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { BookingStatus } from '@prisma/client';

@Controller('bookings')
export class BookingController {

  constructor(
    private readonly bookingService: BookingService,
  ) {}

  @Post()
  create(@Body() dto: CreateBookingDto) {
    return this.bookingService.create(dto);
  }

  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('status') status?: BookingStatus,
    @Query('search') search?: string,
  ) {
    return this.bookingService.findAll(
      Number(page),
      Number(limit),
      status,
      search,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(id);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateBookingStatusDto,
  ) {
    return this.bookingService.updateStatus(id, dto);
  }

  @Delete(':id')
  cancel(
    @Param('id') id: string,
  ) {
    return this.bookingService.cancel(id);
  }

}