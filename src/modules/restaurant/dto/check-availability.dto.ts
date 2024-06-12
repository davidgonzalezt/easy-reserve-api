import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  IsDateString,
} from 'class-validator';

export class CheckAvailabilityDto {
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsString()
  time: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  customers: number;
}
