import fs, { ReadStream } from 'fs';
import { access } from 'fs/promises';
import axios from 'axios';
import { join } from 'path';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ImagesService {
  private readonly imagesDir: string;
  private readonly domain: string;

  constructor (configService: ConfigService) {
    this.imagesDir = configService.getOrThrow('IMAGES_DIR');
    this.domain = configService.getOrThrow('DOMAIN');
  }

  async exists (path: string) {
    try {
      await access(path)
      return true
    } catch {
      return false
    }
  }

  private getFilePath (name: string): string {
    return join(this.imagesDir, name);
  }

  private getNameFromUrl (url: string): string {
    return new URL(url).pathname.replace(/\//g, '__');
  }

  private getResourceUrl (name: string): string {
    return this.domain !== 'localhost'
      ? `https://${this.domain}/${name}`
      : `http://localhost:4000/${name}`;
  }

  async fetchUrl (url: string): Promise<ReadStream> {
    const { data } = await axios.get(url, { responseType: 'stream' });
    return data;
  }

  async readFromStream (name: string): Promise<ReadStream> {
    const path = this.getFilePath(name);

    const exists = await this.exists(path);
    if (!exists) {
      throw new NotFoundException();
    }

    return fs.createReadStream(path, { encoding: 'binary' });
  }

  async readFromUrl (url: string): Promise<ReadStream> {
    return await this.readFromStream(this.getNameFromUrl(url));
  }

  async saveFromSteam (stream: ReadStream, name: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const writeStream = fs.createWriteStream(this.getFilePath(name), { encoding: 'binary' });

      stream.pipe(writeStream)
        .on('error', reject)
        .on('finish', () => resolve(this.getResourceUrl(name)));
    });
  }

  async saveFromUrl (url: string, name?: string): Promise<string> {
    const filename = name || this.getNameFromUrl(url);

    const stream = await this.fetchUrl(url) ;
    await this.saveFromSteam(stream, filename);

    return filename;
  }
}
