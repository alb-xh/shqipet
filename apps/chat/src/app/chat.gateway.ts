import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { GeoInfo } from '@shqipet/geo';
import { Server, Socket } from 'socket.io';

import { Event } from './events';
import { GeoMapService } from './geo-map.service';

console.log(process.env['DOMAIN']);

@WebSocketGateway({ path: '/chat', cors: { origin: process.env['NODE'+'_ENV']['DOMAIN'] } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor (private readonly geoMapService: GeoMapService) {}

  async handleConnection(client: Socket, geo: GeoInfo) {
    this.server.emit(Event.GeoMap, this.geoMapService.add(client.id, geo));
  }

  async handleDisconnect(client: Socket) {
    this.server.emit(Event.GeoMap, this.geoMapService.remove(client.id));
  }
}