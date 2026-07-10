import {
  IsString,
  IsEmail,
  IsUUID,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';

export class CreateBookingDto {

  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsEmail()
  customerEmail: string;

  @IsString()
  customerPhone: string;

  @IsUUID()
  serviceId: string;

  @IsDateString()
  bookingDate: string;

  @IsString()
  bookingTime: string;

  @IsString()
  notes: string;

}