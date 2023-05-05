import { Module } from '@nestjs/common';
import { ConfigModule } from '@shqipet/config';

import { MeController, GoogleTokenManagerService, UsersService } from './me';
import { StorageModule } from '@shqipet/storage';

@Module({
  imports: [ ConfigModule, StorageModule ],
  controllers: [ MeController ],
  providers: [ GoogleTokenManagerService, UsersService ],
})
export class AppModule {}
