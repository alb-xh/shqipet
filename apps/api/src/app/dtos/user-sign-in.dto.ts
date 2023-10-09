import { IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { UserSignIn } from "@shqipet/common";

export class UserSignInDto implements UserSignIn {
  @IsString()
  @Length(8, 32)
  @ApiProperty()
  password: string;
}