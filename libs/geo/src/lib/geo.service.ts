import { join } from 'path';
import { readFileSync } from 'fs';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Reader as ReaderNode, ReaderModel } from '@maxmind/geoip2-node';

export interface GeoInfo {
  name?: string,
  code?: string,
  city?: string,
  lat?: number,
  lng?: number,
}

@Injectable()
export class GeoService {
  private reader: ReaderModel;

  constructor (configService: ConfigService) {
    const path = configService.getOrThrow('GEO_DB_PATH');
    const fullPath = join(process.cwd(), path);
    const file = readFileSync(fullPath);

    this.reader = ReaderNode.openBuffer(file);
  }

  getInfo (ip: string): GeoInfo {
    const {
      country,
      city,
      location,
    } = this.reader.city(ip);

    return {
      name: country?.names?.en,
      code: country?.isoCode,
      city: city?.names?.en,
      lat: location?.latitude,
      lng: location?.longitude,
    }
  }
}
