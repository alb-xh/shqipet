import { Body, Controller, Post, Res, Get, Param } from '@nestjs/common';
import { Response } from 'express';

import { ImagesService } from './service';
import { CreateImageDto, GetImageParamsDto } from './dto';

@Controller()
export class ImagesController {
  constructor(private readonly imageService: ImagesService) {}

  @Post()
  async createImage (@Body() body: CreateImageDto) {
    const { url } = body;

    const name = await this.imageService.saveByUrl(url);

    return { name };
  }

  @Get(':path')
  async getImage (@Param() params: GetImageParamsDto, @Res() res: Response) {
    const { path } = params;

    const stream = await this.imageService.readByPath(path);

    stream.pipe(res);
  }
}
