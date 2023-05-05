import { Module } from '@nestjs/common';
import { GeoMap } from './geo.map';
import { ChatGateway } from './chat.gateway';

@Module({
  providers: [ GeoMap, ChatGateway ],
})
export class AppModule {}
