import { Controller, Delete, ForbiddenException, Get, Post, Req, Res } from '@nestjs/common';
import { Response, Request, CookieOptions} from 'express'
import { ConfigService } from '@nestjs/config';
import { GeoInfo, GeoService } from '@shqipet/geo';

import { UserInfo, GoogleTokenManagerService } from './google-token-manager.service';

@Controller('/me')
export class MeController {
  private readonly domain: string;
  private readonly cookieName = 'me';
  private readonly cookieOptions: CookieOptions = {
    path: '/users',
    httpOnly: true,
    sameSite: true,
  }

  private async getMeInfo (req: Request): Promise<UserInfo & { geo: GeoInfo }> {
    const token = req?.body?.token;
    const ip = this.domain !== 'localhost'
      ? req.headers['x-forwarded-for'] as string || req.socket.remoteAddress
      : '91.82.156.27';

    if (!token || !ip) {
      throw new ForbiddenException();
    }

    const userInfo = await this.googleTokenManagerService.getUserInfo(token);
    const geoInfo = this.geoService.getInfo(ip);

    return {
      ...userInfo,
      geo: geoInfo,
    };
  }

  constructor(
    private readonly googleTokenManagerService: GoogleTokenManagerService,
    private readonly geoService: GeoService,
    configService: ConfigService,
  ) {
    const domain = configService.getOrThrow('DOMAIN')

    this.domain = domain;
    this.cookieOptions.domain = domain;
    this.cookieOptions.secure = domain !== 'localhost';
  }

  @Get()
  getMe (@Req() req: Request) {
    const cookie = req.cookies[this.cookieName];

    if (!cookie) {
      throw new ForbiddenException();
    }

    return this.getMeInfo(cookie);
  }

  @Post()
  async createMe (@Req() req: Request, @Res() res: Response): Promise<void> {
    const meInfo = await this.getMeInfo(req);

    res
      .cookie(this.cookieName, req.body.token, this.cookieOptions)
      .send(meInfo);
  }

  @Delete()
  removeMe (@Res() res: Response): void {
    res
      .clearCookie(this.cookieName, this.cookieOptions)
      .send({ ok: true })
  }
}
