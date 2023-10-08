import { Body, Controller, Delete, ForbiddenException, Get, NotFoundException, Param, Post, Res } from "@nestjs/common";
import { CreateUserResponse, PublicUser } from "@shqipet/common";
import { Response } from 'express';

import { CreateUserDto } from "../dtos";
import { UseAuth, UseThrottle, GetUser } from "../decorators";
import { AuthService, UsersService } from "../services";
import { User } from "@shqipet/db";

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @UseThrottle(3, 60)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<CreateUserResponse> {
    if (await this.usersService.userExists(createUserDto.username)) {
      throw new ForbiddenException('User already exists');
    }

    const user = await this.usersService.createUser(createUserDto);

    return {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePictureUrl: user.profilePictureUrl,
      bio: user.bio,
      resetPasswordCode: user.resetPasswordCode,
    };
  }


  @Get(':username')
  async getUserByUsername(@Param('username') username: string): Promise<PublicUser> {
    const user = await this.usersService.getPublicUser(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Post(':username/sign-in')
  @UseThrottle(3, 60)
  async signIn(
    @Param('username') username: string,
    @Body('password') password: string,
    @Res() response: Response,
  ): Promise<void> {
    const user = await this.usersService.getUser(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!await this.usersService.isUserPasswordValid(user, password)) {
      throw new ForbiddenException('Invalid password');
    }

    await this.authService.signIn(user, response);

    response
      .status(204)
      .send();
  }

  @Delete('me')
  @UseAuth()
  @UseThrottle(3, 60)
  async deleteMe(@GetUser() user: Partial<User>): Promise<void> {
    await this.usersService.deleteUser(user.id);
  }

  @Post('me/sign-out')
  @UseThrottle(3, 60)
  async signMeOut(@Res() res: Response): Promise<void> {
    await this.authService.signOut(res);

    res
      .status(204)
      .send();
  }
}