/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import cookieParser from 'cookie-parser';

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const origin = configService.getOrThrow('DOMAIN');
  const prefix = configService.getOrThrow('USERS_PREFIX');
  const port = configService.getOrThrow('USERS_PORT');

  app.enableCors({ credentials: true, origin: new RegExp(origin) });
  app.use(cookieParser());
  app.setGlobalPrefix(prefix);
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}/${prefix}`);
}

bootstrap();
