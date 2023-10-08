import { IsString, Length } from 'class-validator';
import { CreateUser } from "@shqipet/common";
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements CreateUser {
  @IsString()
  @Length(4, 50)
  @ApiProperty()
  username: string;

  @IsString()
  @Length(2, 50)
  @ApiProperty()
  firstName: string;

  @IsString()
  @Length(2, 50)
  @ApiProperty()
  lastName: string;

  @IsString()
  @Length(8, 32)
  @ApiProperty()
  password: string;
}
