import cookie from 'cookie';

import { Socket } from "socket.io";
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthManager {
  private readonly authenticatedClientIds = new Set<string>();

  constructor(
    private readonly cookieName: string,
  ) {}

  async isAuthenticated (client: Socket): Promise<boolean> {
    if (this.authenticatedClientIds.has(client.id)) {
      return true;
    }

    const token = cookie.parse(client.handshake.headers.cookie)[this.cookieName];

    // TODO: Validate token
    return !!token;
  }
}