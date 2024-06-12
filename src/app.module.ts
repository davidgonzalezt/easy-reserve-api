import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantModule } from './modules/restaurant/restaurant.module';
import { MongoModule } from './modules/moongose/mongoose.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), RestaurantModule, MongoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
