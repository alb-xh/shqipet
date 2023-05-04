import { Injectable } from "@nestjs/common";
import { GeoService, GeoInfo } from "@shqipet/geo";

import { GoogleTokenManagerService, UserInfo } from "./google-token-manager.service";

export type UserData = UserInfo & { geo: GeoInfo };

@Injectable()
export class UsersService {
  constructor(
    private readonly googleTokenManagerService: GoogleTokenManagerService,
    private readonly geoService: GeoService,
  ) {
  }

  async getUser (data: { token: string, ip: string }): Promise<UserData> {
    const userInfo = await this.googleTokenManagerService.getUserInfo(data.token);
    const geoInfo = this.geoService.getInfo(data.ip);

    return {
      ...userInfo,
      geo: geoInfo,
    };
  }
};
