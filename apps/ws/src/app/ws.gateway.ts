import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import {
  WsEvent,
  CreateRoomMessage,
  JoinRoomMessage,
  Message,
  SendToRoomMessage,
} from '@shqipet/common';
import { Server, Socket } from 'socket.io';

import { CorsManager } from './components';
import { GeoHandler, RoomHandler, MessagesHandler } from './handlers';

// We need the reference
const cors = {};

@WebSocketGateway({ path: '/ws', cors })
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor (
    private readonly geoHandler: GeoHandler,
    private readonly roomHandler: RoomHandler,
    private readonly messageHandler: MessagesHandler,
    corsManager: CorsManager,
  ) {
    corsManager.apply(cors);
  }

  async handleConnection (client: Socket) {
    this.geoHandler.handleConnection(this.server, client);
  }

  async handleDisconnect(client: Socket) {
    await Promise.all([
      this.geoHandler.handleDisconnect(this.server, client).catch(console.error),
      this.roomHandler.handleDisconnect(this.server, client).catch(console.error),
    ]);
  }

  @SubscribeMessage(WsEvent.CreateMessage)
  async handleCreateMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: Message,
  ) {
    await this.messageHandler.handleCreateMessage(this.server, client, message);
  }

  @SubscribeMessage(WsEvent.CreateRoom)
  async handleCreateRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: CreateRoomMessage,
  ) {
    await this.roomHandler.handleCreateRoom(this.server, client, message);
  }

  @SubscribeMessage(WsEvent.JoinRoom)
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: JoinRoomMessage,
  ) {
    await this.roomHandler.handleJoinRoom(this.server, client, message);
  }

  @SubscribeMessage(WsEvent.SendToRoom)
  async handleSendToRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: SendToRoomMessage,
  ) {
    await this.roomHandler.handleSendToRoom(this.server, client, message);
  }
}