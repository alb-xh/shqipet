import cookie from 'cookie';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { GeoService } from '@shqipet/geo';
import { WsEvent, CreateRoomMessage, JoinRoomMessage, Message, SendToRoomMessage } from '@shqipet/common';
import { ConfigService } from '@nestjs/config';
import { Server, Socket } from 'socket.io';
import { GoogleAuthService } from '@shqipet/auth';

import { GeoMap, RoomMap } from './maps/';
import { MessageFormatter } from './components';

const cors: Record<string, unknown> = {
  credentials: true,
  origin: '*',
};

@WebSocketGateway({ path: '/ws', cors })
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;


  constructor (
    private readonly googleAuthService: GoogleAuthService,
    private readonly geoMap: GeoMap,
    private readonly roomMap: RoomMap,
    private readonly geoService: GeoService,
    private readonly messageFormatter: MessageFormatter,
    configService: ConfigService,
  ) {
    const cookieName = configService.getOrThrow('COOKIE');
    const domain = configService.getOrThrow('DOMAIN');

    this.cookieName = cookieName;
    this.domain = domain;
    cors.origin = new RegExp(domain);
  }

  private async isLoggedIn (client: Socket): Promise<boolean> {
    if (this.verifiedClients.has(client.id)) {
      return true;
    }

    const token = cookie.parse(client.handshake.headers.cookie)[this.cookieName];
    if (token && await this.googleAuthService.isValid(token)) {
      this.verifiedClients.add(client.id);

      return true;
    }

    return false;
  }

  private getIp (client: Socket): string {
    return this.domain !== 'localhost'
      ? client.handshake.headers['x-real-ip'] as string || client.handshake.address
      : this.devIp;
  }

  async handleConnection (client: Socket) {
    const ip = this.getIp(client);
    if (!ip) {
      return;
    }

    const geoInfo = this.geoService.getInfo(ip);

    this.server.emit(
      WsEvent.UpdateGeoMap,
      this.geoMap.add(client.id, geoInfo)
        .getAll()
    );
}

  async handleDisconnect(client: Socket) {
    // Disconnect from geo map
    if (this.geoMap.exists(client.id)) {
      this.server.emit(
        WsEvent.UpdateGeoMap,
        this.geoMap.remove(client.id)
          .getAll()
      );
    }

    // Disconnect from room map
    for (const room of await this.roomMap.getAll()) {
      for (const clientId of room.members.keys()) {

        if (clientId === client.id) {
          room.removeMember(clientId);

          this.server.to(room.id)
            .emit(WsEvent.UpdateRoom, room.getInfo());
        }
      }
    }
  }

  @SubscribeMessage(WsEvent.CreateMessage)
  async handleCreateMessage(
    @MessageBody() { user, text }: Message,
    @ConnectedSocket() client: Socket,
  ) {
    if (!await this.isLoggedIn(client)) {
      return;
    }

    const formattedText = this.messageFormatter.format(text);
    if (!formattedText) {
      return;
    }

    this.server.emit(WsEvent.BroadcastMessage, { user, text: formattedText });
  }

  @SubscribeMessage(WsEvent.CreateRoom)
  async handleCreateRoom(
    @MessageBody() { id, size, meta }: CreateRoomMessage,
    @ConnectedSocket() client: Socket,
  ) {
    if (!await this.isLoggedIn(client)) {
      return;
    }

    client.

    this.roomMap.set({ id, size, meta });
  }

  @SubscribeMessage(WsEvent.JoinRoom)
  async handleJoinRoom(
    @MessageBody() { id, user }: JoinRoomMessage,
    @ConnectedSocket() client: Socket
  ) {
    if (!await this.isLoggedIn(client)) {
      return;
    }

    const room = this.roomMap.get(id);
    if (room.memberExists(client.id)) {
      return;
    }

    room.setMember({ id: client.id, user });

    for (const id in room.members) {
      this.server.to(id)
        .emit(WsEvent.UpdateRoom, this.roomMap.getInfo(room));
    }
  }

  @SubscribeMessage(WsEvent.SendToRoom)
  async handleSendToRoom(
    @MessageBody() { id, state }: SendToRoomMessage,
    @ConnectedSocket() client: Socket,
  ) {
    if (!await this.isLoggedIn(client)) {
      return;
    }

    const room = this.roomMap.get(id);
    if (!room.memberExists(client.id)) {
      return;
    }

    for (const id in room.members) {
      this.server.to(id)
        .emit(WsEvent.BroadcastToRoom, state);
    }
  }
}