import { Module } from '@nestjs/common';
import { ConfigModule } from '@shqipet/config';
import { StorageModule } from '@shqipet/storage';

import { ImagesController  } from './images';

@Module({
  imports: [ ConfigModule, StorageModule ],
  controllers: [ ImagesController ],
  providers: [],
})
export class AppModule {}
