
import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { OAuth2Client } from 'google-auth-library';

export interface UserInfo {
  avatar?: string,
  name: string,
}

@Injectable()
export class GoogleTokenManagerService {
  private readonly clientId: string;
  private readonly oAuthClient: OAuth2Client;
  constructor (configService: ConfigService) {
    const clientId = configService.getOrThrow('GOOGLE_CLIENT_ID');

    this.clientId = clientId;
    this.oAuthClient = new OAuth2Client(clientId);
  }

  async getUserInfo (token: string): Promise<UserInfo> {
    const ticket = await this.oAuthClient.verifyIdToken({
      idToken: token,
      audience: this.clientId
    });

    const { picture, name, given_name, family_name } = ticket.getPayload();

    const userName = name || [ given_name, family_name ].join(' ');
    if (!userName) {
      throw new ForbiddenException('User must have a name!');
    }

    return {
      name: userName,
      avatar: picture,
    };
  }
}
