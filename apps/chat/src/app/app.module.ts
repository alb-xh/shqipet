import { Module } from '@nestjs/common';
import { ConfigModule } from '@shqipet/config';
import { GeoModule } from '@shqipet/geo';

import { GeoMap } from './geo.map';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [ ConfigModule, GeoModule ],
  providers: [ GeoMap, ChatGateway ],
})
export class AppModule {}
