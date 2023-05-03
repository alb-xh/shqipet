import { Body, Controller, Post, Res, Get, Param } from '@nestjs/common';
import { Response } from 'express';

import { ImagesService } from './service';
import { CreateImageDto, GetImageParamsDto } from './dto';

@Controller()
export class ImagesController {
  constructor(private readonly imageService: ImagesService) {}

  @Post()
  async createImage (@Body() body: CreateImageDto, @Res() res: Response) {
    const { url } = body;

    const name = await this.imageService.saveFromUrl(url);
  }

  @Get(':path')
  async getImage (@Param() params: GetImageParamsDto, res: Response) {
    const { path } = params;

    const stream = readFrom()
  }
}
