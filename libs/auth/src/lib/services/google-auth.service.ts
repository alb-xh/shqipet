
import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UserInfo } from "@shqipet/common";
import { LoginTicket, OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleAuthService {
  private readonly clientId: string;
  private readonly oAuthClient: OAuth2Client;

  constructor (configService: ConfigService) {
    const clientId = configService.getOrThrow('GOOGLE_CLIENT_ID');

    this.clientId = clientId;
    this.oAuthClient = new OAuth2Client(clientId);
  }

  private async getTicket (token: string): Promise<LoginTicket> {
    return this.oAuthClient.verifyIdToken({
      idToken: token,
      audience: this.clientId
    });
  }

  async isValid (token: string): Promise<boolean> {
    try {
      await this.getTicket(token);
      return true;
    } catch {
      return false;
    }
  }

  async getUser (token: string): Promise<UserInfo> {
    const ticket = await this.getTicket(token);

    const { sub, picture, name, given_name, family_name } = ticket.getPayload();

    const userName = name || [ given_name, family_name ].join(' ');
    if (!userName) {
      throw new ForbiddenException('User must have a name!');
    }

    return {
      id: sub,
      name: userName,
      avatar: picture,
    };
  }
}
