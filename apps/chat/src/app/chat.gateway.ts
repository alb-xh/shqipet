import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { GeoInfo } from '@shqipet/geo';
import { Server, Socket } from 'socket.io';

import { Event } from './events';
import { UserData, UsersMap } from './users.map';

@WebSocketGateway({ path: '/chat', cors: { origin: '*' } })
export class ChatGateway {
  @WebSocketServer() server: Server;

  constructor (private readonly users: UsersMap) {}

  @SubscribeMessage(Event.AddUser)
  async addUser (client: Socket, data: UserData) {
    console.log(data);
    this.server.emit(
      Event.UpdateUsers,
      this.users.add(client.id, data)
        .getAll()
    );
  }

  @SubscribeMessage(Event.RemoveUser)
  async removeUser(client: Socket) {
    this.server.emit(
      Event.UpdateUsers,
      this.users.remove(client.id)
        .getAll()
    );
  }
}