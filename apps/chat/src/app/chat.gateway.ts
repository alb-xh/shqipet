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
import { ChatEvent, Message } from '@shqipet/common';
import { ConfigService } from '@nestjs/config';
import { Server, Socket } from 'socket.io';

import { GeoMap } from './geo.map';
import { MessageFormatter } from './message-formatter';
import { GoogleAuthService } from '@shqipet/auth';

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

    if (ip) {
      const geoInfo = this.geoService.getInfo(ip);

      this.server.emit(
        ChatEvent.UpdateGeoMap,
        this.geoMap.add(client.id, geoInfo)
          .getAll()
      );
    }
  }

  async handleDisconnect(client: Socket) {
    if (this.geoMap.exists(client.id)) {
      this.server.emit(
        ChatEvent.UpdateGeoMap,
        this.geoMap.remove(client.id)
          .getAll()
      );
    }
  }

  @SubscribeMessage(ChatEvent.CreateMessage)
  async handleCreateMessage(@MessageBody() message: Message, @ConnectedSocket() client: Socket) {
    if (await this.isLoggedIn(client)) {
      const { user, text } = message;
      const formattedText = this.messageFormatter.format(text);

      if (formattedText) {
        this.server.emit(ChatEvent.BroadcastMessage, { user, text: formattedText });
      }
    }
  }
}