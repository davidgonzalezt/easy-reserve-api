import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Table } from './table.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  time: string;

  @Column()
  customers: number;

  @Column()
  tables: Table[];
}
