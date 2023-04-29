import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios from "axios";
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
    const clientId = configService.getOrThrow('clientId');

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

    let avatar: string;
    if (picture) {
      const { data } = await axios.get(picture, { responseType: 'arraybuffer' });
      avatar = Buffer.from(data, 'binary')
        .toString('base64');
    }

    return {
      name: userName,
      avatar,
    };
  }
}
