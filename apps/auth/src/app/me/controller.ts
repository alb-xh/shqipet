import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express'
import axios from 'axios';

import { CreateMeDto } from './dto';
import { GoogleTokenManagerService } from './google-token-manager.service';
import { ConfigService } from '@nestjs/config';

@Controller('/me')
export class MeController {
  private readonly cookieName: string;
  constructor(
    private readonly googleTokenManagerService: GoogleTokenManagerService,
    configService: ConfigService,
  ) {
    this.cookieName = configService.getOrThrow('cookieName');
  }

  // @Get('/image')
  // getMe () {
  //   return this.appService.getData();
  // }

  @Post()
  async createMe (@Body() body: CreateMeDto, @Res() res: Response): Promise<void> {
    const userInfo = await this.googleTokenManagerService.getUserInfo(body.token);

    res
      .cookie(this.cookieName, body.token, {
        domain: 'localhost',
        path: '/auth',
        secure: false,
        httpOnly: true,
        sameSite: true,
      })
      .send(userInfo);
  }
}
