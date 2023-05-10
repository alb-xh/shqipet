import { Module } from '@nestjs/common';
import { ConfigModule } from '@shqipet/config';
import { AuthModule } from '@shqipet/auth';

import { MeController } from './me';
import { StorageModule } from '@shqipet/storage';

@Module({
  imports: [ ConfigModule, AuthModule, StorageModule ],
  controllers: [ MeController ],
})
export class AppModule {}
