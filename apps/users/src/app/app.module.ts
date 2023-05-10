import { Module } from '@nestjs/common';
import { ConfigModule } from '@shqipet/config';
import { AuthModule } from '@shqipet/auth';

import { MeController } from './me';

@Module({
  imports: [ ConfigModule, AuthModule ],
  controllers: [ MeController ],
})
export class AppModule {}
