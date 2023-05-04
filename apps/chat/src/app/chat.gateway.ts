import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { GeoInfo } from '@shqipet/geo';
import { Server, Socket } from 'socket.io';

import { Event } from './events';
import { UserData, UsersMap } from './users.map';

@WebSocketGateway({ path: '/chat', cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor (private readonly users: UsersMap) {}

  async handleConnection(client: Socket, data: UserData) {
    this.server.emit(
      Event.UpdateUsers,
      this.users.add(client.id, data)
        .getAll()
    );
  }

  async handleDisconnect(client: Socket) {
    this.server.emit(
      Event.UpdateUsers,
      this.users.remove(client.id)
        .getAll()
    );
  }
}