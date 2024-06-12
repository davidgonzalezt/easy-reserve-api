import { Module } from '@nestjs/common';
import { RestaurantController } from './controllers/restaurant.controller';
import { RestaurantService } from './services/restaurant.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Restaurant, RestaurantSchema } from './restaurant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Restaurant.name, schema: RestaurantSchema },
    ]),
  ],
  providers: [RestaurantService],
  controllers: [RestaurantController],
})
export class RestaurantModule {}
