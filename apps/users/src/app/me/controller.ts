import { Response, Request, CookieOptions} from 'express';
import { Body, Controller, Delete, ForbiddenException, Get, Post, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleAuthService } from '@shqipet/auth';

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
    private readonly googleAuthService: GoogleAuthService,
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

    try {
      const user = this.googleAuthService.getUser(cookie);
      return user;
    } catch {
      throw new ForbiddenException();
    }
  }

  @Post()
  async createMe (@Body('token') token: string, @Res() res: Response): Promise<void> {
    if (!token) {
      throw new ForbiddenException();
    }

    const meData = await this.googleAuthService.getUser(token);

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
