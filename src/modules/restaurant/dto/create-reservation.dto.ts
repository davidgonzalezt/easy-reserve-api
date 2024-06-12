import {
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsString,
  Min,
} from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsNumber()
  restaurantId: string;

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
