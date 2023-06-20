import { Injectable } from "@nestjs/common";
import { Socket } from "socket.io";

@Injectable()
export class IpExtractor {
  private readonly devIp = '91.82.156.27';

  constructor (
    private readonly domain: string,

  ) {}

  extract (client: Socket): string {
    return this.domain !== 'localhost'
    ? client.handshake.headers['x-real-ip'] as string || client.handshake.address
    : this.devIp;
  }
}
