import * as fs from 'fs';
import { access } from 'fs/promises';
import axios from 'axios';
import { join } from 'path';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ImagesStorageService {
  private readonly imagesDir: string;
  private readonly domain: string;
  private readonly extension = 'png';

  constructor (configService: ConfigService) {
    this.domain = configService.getOrThrow('DOMAIN');

    const dir = configService.getOrThrow('IMAGES_DIR');
    this.imagesDir = join(process.cwd(), dir);
  }

  async exists (path: string): Promise<boolean> {
    try {
      await access(path);

      return true;
    } catch {
      return false;
    }
  }

  private getPath (name: string): string {
    return join(this.imagesDir, name);
  }

  private getExternalUrlName (url: string): string {
    const identifier = new URL(url).pathname.replace(/\//g, '__');

    return `${identifier}.${this.extension}`;
  }

  async readByName (name: string): Promise<fs.ReadStream> {
    const path = this.getPath(name);

    const exists = await this.exists(path);
    if (!exists) {
      throw new NotFoundException();
    }

    return fs.createReadStream(path);
  }

  private getImageUrl (name: string): string {
    return this.domain !== 'localhost'
      ? `https://${this.domain}/images/${name}`
      : `http://localhost:4000/images/${name}`;
  }

  async fetchUrl (url: string): Promise<fs.ReadStream> {
    const { data } = await axios.get(url, { responseType: 'stream' });
    return data;
  }

  async saveBySteam (stream: fs.ReadStream, name: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const path = this.getPath(name);
      const url = this.getImageUrl(name);

      const writeStream = fs.createWriteStream(path);

      stream.pipe(writeStream)
        .on('error', reject)
        .on('finish', () => resolve(url));
    });
  }

  async saveByUrl (url: string, name?: string): Promise<string> {
    const filename = name || this.getExternalUrlName(url);

    const stream = await this.fetchUrl(url) ;
    const imageUrl = await this.saveBySteam(stream, filename);

    return imageUrl;
  }
}
