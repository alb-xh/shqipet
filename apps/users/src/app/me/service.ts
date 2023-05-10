import { Injectable } from "@nestjs/common";
import { ImagesStorageService } from "@shqipet/storage";
import { UserInfo } from "@shqipet/common";

import { GoogleTokenManagerService } from "./google-token-manager.service";

@Injectable()
export class UsersService {
  constructor(
    private readonly googleTokenManagerService: GoogleTokenManagerService,
    private readonly imagesStorageService: ImagesStorageService,
  ) {}

  async getUser (token: string): Promise<UserInfo> {
    const { name, avatar } = await this.googleTokenManagerService.getUserInfo(token);

    return {
      avatar,
      name,
    };
  }
};
