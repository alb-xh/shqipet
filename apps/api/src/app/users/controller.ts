import { Response, Request, CookieOptions} from 'express';
import { Body, Controller, Delete, ForbiddenException, Get, Post, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleAuthService } from '@shqipet/auth';

@Controller('users')
export class UsersController {
  @Get('/:username')
  get () {
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

  @Get('me')
  getMe () {
    return;
  }

  @Post()
  async createMe (@Body('token') token: string, @Res() res: Response): Promise<void> {
    if (!token) {
      throw new ForbiddenException();
    }

    try {
      const meData = await this.googleAuthService.getUser(token);

      res
      .cookie(this.cookieName, token, this.cookieOptions)
      .send(meData);
    } catch {
      throw new ForbiddenException();
    }
  }



  @Delete()
  removeMe (@Res() res: Response): void {
    res
      .clearCookie(this.cookieName, this.cookieOptions)
      .send({ ok: true })
  }
}
