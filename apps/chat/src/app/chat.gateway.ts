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
import { ChatEvent, CreateRoomMessage, JoinRoomMessage, Message, SendToRoomMessage } from '@shqipet/common';
import { ConfigService } from '@nestjs/config';
import { Server, Socket } from 'socket.io';
import { GoogleAuthService } from '@shqipet/auth';

import { GeoMap } from './geo.map';
import { MessageFormatter } from './message-formatter';
import { RoomMap } from './room.map';

const cors: Record<string, unknown> = {
  credentials: true,
  origin: '*',
};

@WebSocketGateway({ path: '/chat', cors })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private readonly verifiedClients = new Set<string>();

  private readonly cookieName: string;
  private readonly domain: string;
  private readonly devIp = '91.82.156.27';

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
      ChatEvent.UpdateGeoMap,
      this.geoMap.add(client.id, geoInfo)
        .getAll()
    );
}

  async handleDisconnect(client: Socket) {
    if (!this.geoMap.exists(client.id)) {
      return;
    }

    this.server.emit(
      ChatEvent.UpdateGeoMap,
      this.geoMap.remove(client.id)
        .getAll()
    );

    for (const roomId in this.roomMap.getAll()) {
      const room = this.roomMap.get(roomId);

      for (const memberId in room.members) {
        if (memberId !== client.id) {
          continue;
        }

        room.removeMember(memberId);

        this.server.to(roomId)
          .emit(ChatEvent.UpdateRoom, this.roomMap.getInfo(room));
      }
    }
  }

  @SubscribeMessage(ChatEvent.CreateMessage)
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

    this.server.emit(ChatEvent.BroadcastMessage, { user, text: formattedText });
  }

  @SubscribeMessage(ChatEvent.CreateRoom)
  async handleCreateRoom(
    @MessageBody() { id, size, meta }: CreateRoomMessage,
    @ConnectedSocket() client: Socket,
  ) {
    if (!await this.isLoggedIn(client)) {
      return;
    }

    this.roomMap.set({ id, size, meta });
  }

  @SubscribeMessage(ChatEvent.JoinRoom)
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
        .emit(ChatEvent.UpdateRoom, this.roomMap.getInfo(room));
    }
  }

  @SubscribeMessage(ChatEvent.SendToRoom)
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
        .emit(ChatEvent.BroadcastToRoom, state);
    }
  }
}