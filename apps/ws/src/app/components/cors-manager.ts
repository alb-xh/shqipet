import { Injectable } from "@nestjs/common";

@Injectable()
export class CorsManager {
  constructor(private readonly domain: string) {}

  apply (cors: object) {
    cors['credentials'] = true;
    cors['origin'] = new RegExp(this.domain);
  }
};
