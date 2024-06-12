import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://josedavidgonzalezt:21r2lDp4XgEeV667@cluster0.osbblgl.mongodb.net/easy-reserve?retryWrites=true&w=majority&appName=Cluster0',
    ),
  ],
})
export class MongoModule {}
