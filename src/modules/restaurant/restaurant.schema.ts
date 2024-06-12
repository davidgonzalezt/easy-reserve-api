import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Table {
  @Prop()
  id: number;

  @Prop()
  size: number;

  @Prop({ type: [{ date: String, time: String }] })
  reservations: { date: string; time: string }[];
}

const TableSchema = SchemaFactory.createForClass(Table);

@Schema({ collection: 'reserve' }) // Aquí especificas la colección
export class Restaurant extends Document {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop({ type: [TableSchema] })
  tables: Table[];
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
