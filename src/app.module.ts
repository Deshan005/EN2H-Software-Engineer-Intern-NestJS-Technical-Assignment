import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [

    PrismaModule,

    UsersModule,

    AuthModule,

    ServiceModule,

  ],
})
export class AppModule {}