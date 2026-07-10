import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { BookingStatus } from '@prisma/client';

import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';

@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateBookingDto) {
    // Check service exists
    const service = await this.prisma.service.findUnique({
      where: {
        id: dto.serviceId,
      },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    // Date validation
    const bookingDate = new Date(dto.bookingDate);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (bookingDate < today) {
      throw new BadRequestException(
        'Booking date cannot be in the past',
      );
    }

    // Duplicate booking
    const duplicate = await this.prisma.booking.findFirst({
      where: {
        serviceId: dto.serviceId,
        bookingDate,
        bookingTime: dto.bookingTime,
        status: {
          not: BookingStatus.CANCELLED,
        },
      },
    });

    if (duplicate) {
      throw new BadRequestException(
        'Time slot already booked',
      );
    }

    return this.prisma.booking.create({
      data: {
        ...dto,
        bookingDate,
      },
    });
  }

  async findAll(
    page = 1,
    limit = 10,
    status?: BookingStatus,
    search?: string,
  ) {
    return this.prisma.booking.findMany({
      skip: (page - 1) * limit,
      take: Number(limit),

      where: {
        ...(status && { status }),

        ...(search && {
          OR: [
            {
              customerName: {
                contains: search,
                mode: 'insensitive',
              },
            },
            {
              customerEmail: {
                contains: search,
                mode: 'insensitive',
              },
            },
          ],
        }),
      },

      include: {
        service: true,
      },

      orderBy: {
        bookingDate: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },

      include: {
        service: true,
      },
    });

    if (!booking) {
      throw new NotFoundException(
        'Booking not found',
      );
    }

    return booking;
  }

  async updateStatus(
    id: string,
    dto: UpdateBookingStatusDto,
  ) {
    const booking = await this.findOne(id);

    if (
      booking.status === BookingStatus.CANCELLED &&
      dto.status === BookingStatus.COMPLETED
    ) {
      throw new BadRequestException(
        'Cancelled booking cannot be completed',
      );
    }

    return this.prisma.booking.update({
      where: { id },

      data: {
        status: dto.status,
      },
    });
  }

  async cancel(id: string) {
    await this.findOne(id);

    return this.prisma.booking.update({
      where: {
        id,
      },

      data: {
        status: BookingStatus.CANCELLED,
      },
    });
  }
}