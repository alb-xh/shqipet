import { IsString, IsUrl } from 'class-validator';

export class CreateImageDto {
  @IsUrl()
  url: string;
}

export class GetImageParamsDto {
  @IsString()
  path: string;
}