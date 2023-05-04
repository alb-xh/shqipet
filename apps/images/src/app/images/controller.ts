import { Response } from 'express';
import { Body, Controller, Post, Res, Get, Param } from '@nestjs/common';
import { ImagesStorageService } from '@shqipet/storage';

import { CreateImageDto, GetImageParamsDto } from './dto';

@Controller()
export class ImagesController {
  constructor(private readonly imageStorageService: ImagesStorageService) {}

  @Post()
  async createImage (@Body() body: CreateImageDto) {
    const { url } = body;

    const name = await this.imageStorageService.saveByUrl(url);

    return { name };
  }

  @Get(':path')
  async getImage (@Param() params: GetImageParamsDto, @Res() res: Response) {
    const { path } = params;

    const stream = await this.imageStorageService.readByPath(path);

    stream.pipe(res);
  }
}
