import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { GeoService } from '@shqipet/geo';
import { ChatEvent, Message } from '@shqipet/common';
import { ConfigService } from '@nestjs/config';

import { Server, Socket } from 'socket.io';
import { GeoMap } from './geo.map';
import { MessageFormatter } from './message-formatter';

@WebSocketGateway({ path: '/chat', cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private readonly domain: string;
  private readonly devIp = '91.82.156.27';

  constructor (
    private readonly geoMap: GeoMap,
    private readonly geoService: GeoService,
    private readonly messageFormatter: MessageFormatter,
    configService: ConfigService,
  ) {
    this.domain = configService.getOrThrow('DOMAIN');
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
    this.server.emit(
      ChatEvent.UpdateGeoMap,
      this.geoMap.remove(client.id)
        .getAll()
    );
  }

  @SubscribeMessage(ChatEvent.CreateMessage)
  async handleCreateMessage(@MessageBody() message: Message) {
    const { user, text } = message;
    const formattedText = this.messageFormatter.format(text);

    if (formattedText) {
      this.server.emit(ChatEvent.BroadcastMessage, { user, text: formattedText });
    }
  }
}