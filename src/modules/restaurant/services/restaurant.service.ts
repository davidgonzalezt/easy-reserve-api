import { Injectable } from '@nestjs/common';
import { Restaurant } from '../entities/restaurant.entity';
import { CheckAvailabilityDto } from '../dto/check-availability.dto';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import restaurants from '../../../mocks/data.json';
import { writeFile } from 'fs/promises';
@Injectable()
export class RestaurantService {
  constructor() {}

  async checkAvailability(
    checkAvailabilityDto: CheckAvailabilityDto,
  ): Promise<Restaurant[]> {
    const { date, time, customers } = checkAvailabilityDto;
    console.log(date, time, customers);
    return restaurants.data
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
          ? { ...restaurant, tables: filteredTables }
          : null;
      })
      .filter((restaurant) => restaurant !== null) as Restaurant[];
  }

  async createReservation(
    createReservationDto: CreateReservationDto,
  ): Promise<string> {
    const { date, time, customers, restaurantId } = createReservationDto;

    // Buscar el restaurante por ID en el array de data
    const restaurant = restaurants.data.find((r) => r.id === restaurantId);

    if (!restaurant) {
      throw new Error(`Restaurant with ID ${restaurantId} not found.`);
    }

    // Buscar la primera mesa disponible en el restaurante
    const table = restaurant.tables.find((table) => {
      if (table.size === Number(customers)) {
        // Verificar si la mesa no tiene reservaciones para la fecha y hora especificadas
        if (!table?.reservations) {
          return true; // Si no tiene reservaciones, la mesa está disponible
        }
        // Verificar si ya hay una reserva para esa fecha y hora
        const isReserved = table.reservations.some(
          (reservation) =>
            reservation.date === date && reservation.time === time,
        );
        return !isReserved; // Retornar true si no está reservada
      }
      return false;
    });
    if (!table) {
      throw new Error(
        `No available tables for ${customers} customers at ${restaurant.name} on ${date} at ${time}.`,
      );
    }

    // Agregar la nueva reserva a la mesa encontrada
    if (!table.reservations) {
      table.reservations = [];
    }
    table.reservations.push({ date, time });

    // Guardar los cambios en el archivo data.json
    await this.saveDataToJsonFile(restaurants);

    return `Reserva realizada para ${restaurant.name} el ${date} a las ${time} para ${customers} clientes.`;
  }

  private async saveDataToJsonFile(data: any): Promise<void> {
    try {
      await writeFile('src/mocks/data.json', JSON.stringify(data, null, 2));
    } catch (error) {
      throw new Error(`Error saving data to JSON file: ${error.message}`);
    }
  }
}
