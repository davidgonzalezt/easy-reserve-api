import { Controller, Post, Body } from '@nestjs/common';
import { RestaurantService } from '../services/restaurant.service';
import { CheckAvailabilityDto } from '../dto/check-availability.dto';
import { CreateReservationDto } from '../dto/create-reservation.dto';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post('availability')
  async checkAvailability(@Body() checkAvailabilityDto: CheckAvailabilityDto) {
    return this.restaurantService.checkAvailability(checkAvailabilityDto);
  }

  @Post('reserve')
  async createReservation(@Body() createReservationDto: CreateReservationDto) {
    return this.restaurantService.createReservation(createReservationDto);
  }
}
