import { ApiProperty } from "@nestjs/swagger";
import { ChangePassword } from "@shqipet/common";
import { IsString, Length } from "class-validator";

export class ChangePasswordDto implements ChangePassword {
  @IsString()
  @Length(8, 32)
  @ApiProperty()
  oldPassword: string;

  @IsString()
  @Length(8, 32)
  @ApiProperty()
  newPassword: string;
}
