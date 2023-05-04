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

  private getNameFromPath (path: string): string {
    return path.replace(/\//g, '__');
  }

  private getNameFromUrl (url: string): string {
    return this.getNameFromPath(new URL(url).pathname);
  }

  private getImageUrl (name: string): string {
    return this.domain !== 'localhost'
      ? `https://${this.domain}/${name}`
      : `http://localhost:4000/${name}`;
  }

  async fetchUrl (url: string): Promise<fs.ReadStream> {
    const { data } = await axios.get(url, { responseType: 'stream' });
    return data;
  }

  async readByName (name: string): Promise<fs.ReadStream> {
    const path = this.getPath(name);

    const exists = await this.exists(path);
    if (!exists) {
      throw new NotFoundException();
    }

    return fs.createReadStream(path, { encoding: 'binary' });
  }

  async readByPath (path: string): Promise<fs.ReadStream> {
    return await this.readByName(this.getNameFromPath(path));
  }

  async readByUrl (url: string): Promise<fs.ReadStream> {
    return await this.readByName(this.getNameFromUrl(url));
  }

  async saveBySteam (stream: fs.ReadStream, name: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const writeStream = fs.createWriteStream(this.getPath(name), { encoding: 'binary' });

      stream.pipe(writeStream)
        .on('error', reject)
        .on('finish', () => resolve(this.getImageUrl(name)));
    });
  }

  async saveByUrl (url: string, name?: string): Promise<string> {
    const filename = name || this.getNameFromUrl(url);

    const stream = await this.fetchUrl(url) ;
    const imageUrl = await this.saveBySteam(stream, filename);

    return imageUrl;
  }
}
