import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';

import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('services')
export class ServiceController {
  constructor(
    private readonly serviceService: ServiceService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() dto: CreateServiceDto,
    @Request() req,
  ) {
    return this.serviceService.create(dto, req.user.id);
  }

  @Get()
  findAll() {
    return this.serviceService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.serviceService.findOne(id);
  }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
    @Param('id') id: string,
    @Body() dto: UpdateServiceDto,
    ) {
    return this.serviceService.update(id, dto);
    }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.serviceService.remove(id);
  }
}