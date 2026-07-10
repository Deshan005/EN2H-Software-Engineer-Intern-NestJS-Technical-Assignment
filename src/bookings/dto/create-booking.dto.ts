import {
  IsString,
  IsEmail,
  IsUUID,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateBookingDto {
  @IsString()
  customerName!: string;

  @IsEmail()
  customerEmail!: string;

  @IsString()
  customerPhone!: string;

  @IsUUID()
  serviceId!: string;

  @IsDateString()
  bookingDate!: string;

  @IsString()
  bookingTime!: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
