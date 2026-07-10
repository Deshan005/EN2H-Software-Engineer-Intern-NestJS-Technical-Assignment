import {
  IsString,
  IsBoolean,
  IsNumber,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  @IsPositive()
  duration!: number;

  @IsNumber()
  @IsPositive()
  price!: number;

  @IsBoolean()
  isActive!: boolean;
}
