import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { config } from './config';
import { MeController, GoogleTokenManagerService } from './me';

@Module({
  imports: [ ConfigModule.forRoot({ load: [ config ]}) ],
  controllers: [ MeController ],
  providers: [ GoogleTokenManagerService],
})
export class AppModule {}
