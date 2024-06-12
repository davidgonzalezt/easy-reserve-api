import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: [
      'https://easy-reserve.vercel.app',
      'http://localhost:3000',
      '*', // Puedes agregar otras URL de desarrollo si es necesario
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept',
  });
  await app.listen(8000);
}
bootstrap();
