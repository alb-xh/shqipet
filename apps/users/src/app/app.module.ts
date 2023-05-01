import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GeoModule } from '@shqipet/geo';

import { MeController, GoogleTokenManagerService } from './me';

const envFilePath = process.env['NODE' + '_ENV'] === 'production' ? '.prod.env' : '.dev.env';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    GeoModule,
  ],
  controllers: [ MeController ],
  providers: [ GoogleTokenManagerService],
})
export class AppModule {}
