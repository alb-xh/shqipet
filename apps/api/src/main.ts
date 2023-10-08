/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import cookieParser from 'cookie-parser';

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { isProduction } from '@shqipet/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.getOrThrow('PORT');
  const prefix = configService.getOrThrow('PREFIX');
  const origin = configService.getOrThrow('DOMAIN');

  app.enableCors({ credentials: true, origin: new RegExp(origin) });
  app.use(cookieParser());
  app.setGlobalPrefix(prefix);
  app.useGlobalPipes(new ValidationPipe())

  if (!isProduction()) {
    const config = new DocumentBuilder()
    .setTitle('Shqipet')
    .setDescription(`The shqipet API description`)
    .setVersion('1.0')
    .addTag('shqipet')
    .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(prefix, app, document);
  }

  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}/${prefix}`);
}

bootstrap();
