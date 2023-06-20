import { Module } from '@nestjs/common';
import { ConfigModule } from '@shqipet/config';
import { GeoModule } from '@shqipet/geo';
import { AuthModule } from '@shqipet/auth';


import { WsGateway } from './ws.gateway';
import { GeoMap, RoomMap } from './maps';
import { MessageFormatter } from './components';

@Module({
  imports: [ ConfigModule, AuthModule, GeoModule ],
  providers: [ GeoMap, RoomMap, MessageFormatter, WsGateway ],
})
export class AppModule {}
