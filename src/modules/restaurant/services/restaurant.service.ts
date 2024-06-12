import { Injectable } from '@nestjs/common';
import { CheckAvailabilityDto } from '../dto/check-availability.dto';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurant } from '../restaurant.schema';
@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant.name) private restaurantModel: Model<Restaurant>,
  ) {}

  async checkAvailability(
    checkAvailabilityDto: CheckAvailabilityDto,
  ): Promise<any[]> {
    const { date, time, customers } = checkAvailabilityDto;
    const restaurants = await this.restaurantModel.find().exec();
    const filteredRestaurants = restaurants
      .map((restaurant) => {
        // Filtrar mesas por tamaño y disponibilidad
        const filteredTables = restaurant.tables.filter((table) => {
          if (table.size !== Number(customers)) {
            return false;
          }
          if (!table.reservations) {
            return true;
          }
          // Verificar si hay alguna reserva en la fecha y hora especificadas
          const isReserved = table.reservations.some(
            (reservation) =>
              reservation.date === date && reservation.time === time,
          );
          return !isReserved;
        });

        return filteredTables.length > 0
          ? { ...restaurant.toObject(), tables: filteredTables }
          : null;
      })
      .filter((restaurant) => restaurant !== null);

    return filteredRestaurants;
  }

  async createReservation(
    createReservationDto: CreateReservationDto,
  ): Promise<string> {
    const { date, time, customers, restaurantId } = createReservationDto;
    const restaurant = await this.restaurantModel
      .findOne({ id: restaurantId })
      .exec();

    if (!restaurant) {
      throw new Error('Restaurant not found');
    }

    const table = restaurant.tables.find(
      (table) =>
        table.size === Number(customers) &&
        (!table.reservations ||
          !table.reservations.some(
            (reservation) =>
              reservation.date === date && reservation.time === time,
          )),
    );

    if (!table) {
      throw new Error('No available table found');
    }

    if (!table.reservations) {
      table.reservations = [];
    }

    table.reservations.push({ date, time });

    await restaurant.save();

    return `Reservation made at ${restaurant.name} on ${date} at ${time} for ${customers} customers.`;
  }
}
