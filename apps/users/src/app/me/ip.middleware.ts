import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class IpMiddleware implements NestMiddleware {
  private readonly domain: string;
  private readonly devIp = '91.82.156.27';

  constructor (configService: ConfigService) {
    this.domain = configService.getOrThrow('DOMAIN');
  }

  use(req: Request, res: Response, next: NextFunction) {
    const ip = this.domain !== 'localhost'
      ? req.headers['x-real-ip'] as string || req.socket.remoteAddress
      : this.devIp;

    req['clientIp'] = ip;

    next();
  }
}
