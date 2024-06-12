import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Table {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  size: number;

  @Column()
  reservation?: Reserve[];
}

export class Reserve {
  @PrimaryGeneratedColumn()
  time: string;

  @Column()
  date: number;
}
