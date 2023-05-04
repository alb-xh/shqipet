import { Module } from '@nestjs/common';
import { ConfigModule } from '@shqipet/config';

import { ImagesController, ImagesService } from './images';

@Module({
  imports: [ConfigModule],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class AppModule {}
