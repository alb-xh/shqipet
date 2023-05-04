import { Injectable } from "@nestjs/common";
import { GeoService, GeoInfo } from "@shqipet/geo";
import { ImagesStorageService } from "@shqipet/storage";

import { GoogleTokenManagerService, UserInfo } from "./google-token-manager.service";

export type UserData = UserInfo & { geo: GeoInfo };

@Injectable()
export class UsersService {
  constructor(
    private readonly googleTokenManagerService: GoogleTokenManagerService,
    private readonly imagesStorageService: ImagesStorageService,
    private readonly geoService: GeoService,
  ) {
  }

  async getUser (data: { token: string, ip: string }): Promise<UserData> {
    const geoInfo = this.geoService.getInfo(data.ip);
    const { name, avatar } = await this.googleTokenManagerService.getUserInfo(data.token);

    const ourAvatar = avatar
      ? await this.imagesStorageService.saveByUrl(avatar)
      : null;

    return {
      geo: geoInfo,
      avatar: ourAvatar,
      name,
    };
  }
};
