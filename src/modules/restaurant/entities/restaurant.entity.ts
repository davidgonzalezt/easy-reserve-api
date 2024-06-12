import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Table } from './table.entity';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  tables: Table[];
}
