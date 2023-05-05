import { Response, Request, CookieOptions} from 'express';
import { Body, Controller, Delete, ForbiddenException, Get, Post, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UsersService } from './service';

@Controller('/me')
export class MeController {
  private readonly domain: string;
  private readonly cookieName = 'me';
  private readonly cookieOptions: CookieOptions = {
    path: '/users',
    httpOnly: true,
    sameSite: true,
  }

  constructor(
    private readonly usersService: UsersService,
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

    return this.usersService.getUser(cookie);
  }

  @Post()
  async createMe (@Body('token') token: string, @Res() res: Response): Promise<void> {
    if (!token) {
      throw new ForbiddenException();
    }

    const meData = await this.usersService.getUser(token);

    res
      .cookie(this.cookieName, token, this.cookieOptions)
      .send(meData);
  }

  @Delete()
  removeMe (@Res() res: Response): void {
    res
      .clearCookie(this.cookieName, this.cookieOptions)
      .send({ ok: true })
  }
}
