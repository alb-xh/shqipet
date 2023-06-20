import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5000);

  Logger.log(`🚀 Application is running on: http://localhost:5000/ws`);
}

bootstrap();