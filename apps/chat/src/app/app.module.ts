import { Module } from '@nestjs/common';
import { GeoMapService } from './geo-map.service';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [],
  providers: [ GeoMapService, ChatGateway ],
})
export class AppModule {}
