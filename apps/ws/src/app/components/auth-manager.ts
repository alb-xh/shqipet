import cookie from 'cookie';

import { Socket } from "socket.io";
import { Injectable } from '@nestjs/common';
import { GoogleAuthService } from "@shqipet/auth";

@Injectable()
export class AuthManager {
  private readonly authenticatedClientIds = new Set<string>();

  constructor(
    private readonly googleAuthService: GoogleAuthService,
    private readonly cookieName: string,
  ) {}

  async isAuthenticated (client: Socket): Promise<boolean> {
    if (this.authenticatedClientIds.has(client.id)) {
      return true;
    }

    const token = cookie.parse(client.handshake.headers.cookie)[this.cookieName];

    return token && await this.googleAuthService.isValid(token);
  }
}