import { Module } from '@nestjs/common';
import { ConfigModule } from '@shqipet/config';
import { GeoModule } from '@shqipet/geo';

import { MeController, GoogleTokenManagerService } from './me';

@Module({
  imports: [ ConfigModule, GeoModule ],
  controllers: [ MeController ],
  providers: [ GoogleTokenManagerService],
})
export class AppModule {}
