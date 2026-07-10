import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ServiceModule } from './services/services.module';
import { BookingModule } from './bookings/bookings.module';

@Module({
  imports: [
    PrismaModule,

    UsersModule,

    AuthModule,

    ServiceModule,

    BookingModule,
  ],
})
export class AppModule {}
