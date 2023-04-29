import { Body, Controller, Delete, ForbiddenException, Get, Post, Req, Res } from '@nestjs/common';
import { Response, Request, CookieOptions} from 'express'
import { ConfigService } from '@nestjs/config';

import { CreateMeDto } from './dto';
import { GoogleTokenManagerService } from './google-token-manager.service';

@Controller('/me')
export class MeController {
  private readonly cookieName: string;
  private readonly cookieOptions: CookieOptions;

  constructor(
    private readonly googleTokenManagerService: GoogleTokenManagerService,
    configService: ConfigService,
  ) {
    this.cookieName = configService.getOrThrow('COOKIE_NAME');
    this.cookieOptions = {
      domain: configService.getOrThrow('DOMAIN'),
      secure: configService.getOrThrow('SECURE'),
      path: configService.getOrThrow('COOKIE_PATH'),
      httpOnly: configService.getOrThrow('COOKIE_HTTP_ONLY'),
    };
  }

  @Get()
  getMe (@Req() req: Request) {
    const cookie = req.cookies[this.cookieName];

    if (!cookie) {
      throw new ForbiddenException();
    }

    return this.googleTokenManagerService.getUserInfo(cookie);
  }

  @Post()
  async createMe (@Body() body: CreateMeDto, @Res() res: Response): Promise<void> {
    const userInfo = await this.googleTokenManagerService.getUserInfo(body.token);

    res
      .cookie(this.cookieName, body.token, this.cookieOptions)
      .send(userInfo);
  }

  @Delete()
  removeMe (@Res() res: Response): void {
    res
      .clearCookie(this.cookieName, this.cookieOptions)
      .send({ ok: true })
  }
}
