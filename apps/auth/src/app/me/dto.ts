import { IsJWT } from 'class-validator';

export class CreateMeDto {
  @IsJWT()
  token: string;
};
