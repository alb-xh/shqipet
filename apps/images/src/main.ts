/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = 4000;
  const prefix = 'images';

  const configService = app.get(ConfigService);
  const origin = configService.getOrThrow('DOMAIN');

  app.enableCors({ origin: new RegExp(origin) });
  app.setGlobalPrefix(prefix);
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}/${prefix}`);
}

bootstrap();
