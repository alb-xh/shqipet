import { Body, Controller, ForbiddenException, Get, NotFoundException, Param, Post, Res } from "@nestjs/common";
import { PublicUser } from "@shqipet/common";
import { Response } from 'express';

import { CreateUserDto, UserSignInDto } from "../dtos";
import { UseThrottle } from "../decorators";
import { AuthService, UsersService } from "../services";

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @UseThrottle(3, 60)
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response): Promise<void> {
    if (await this.usersService.userExists(createUserDto.username)) {
      throw new ForbiddenException('User already exists');
    }

    const user = await this.usersService.createUser(createUserDto);
    await this.authService.signIn(user, res);

    res
    .status(201)
    .send({
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePictureUrl: user.profilePictureUrl,
      bio: user.bio,
      resetPasswordCode: user.resetPasswordCode,
    });
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
    @Body() body: UserSignInDto,
    @Res() response: Response,
  ): Promise<void> {
    const user = await this.usersService.getUser(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!await this.usersService.isUserPasswordValid(user, body.password)) {
      throw new ForbiddenException('Invalid password');
    }

    this.authService.signIn(user, response);

    response
      .status(204)
      .send();
  }

}