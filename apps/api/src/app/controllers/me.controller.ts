import { Body, Controller, Delete, ForbiddenException, Get, Patch, Post, Res } from "@nestjs/common";
import { Response } from 'express';
import { User } from "@shqipet/db";
import { PublicUser } from "@shqipet/common";

import { UseAuth, UseThrottle, GetUser } from "../decorators";
import { AuthService, UsersService } from "../services";
import { ChangePasswordDto } from "../dtos";

@Controller('me')
@UseAuth()
export class MeController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  @UseThrottle(10, 60)
  async getMe (@GetUser() user: Partial<User>): Promise<PublicUser> {
    return this.usersService.getPublicUser(user.id);
  }

  @Delete()
  @UseThrottle(3, 60)
  async deleteMe(@GetUser() user: Partial<User>): Promise<void> {
    await this.usersService.deleteUser(user.id);
  }

  @Post('sign-out')
  @UseThrottle(10, 60)
  async signMeOut(@Res() res: Response): Promise<void> {
    await this.authService.signOut(res);

    res
      .status(204)
      .send();
  }

  @Patch('update-password')
  @UseThrottle(1, 60)
  async updateMyPassword(
    @GetUser() user: Partial<User>,
    @Body() body: ChangePasswordDto,
  ): Promise<void> {
    if (!await this.usersService.isUserPasswordValid(user.id, body.oldPassword)) {
      throw new ForbiddenException('Invalid password');
    }

    await this.usersService.updateUserPassword(user.id, body.newPassword);
  }
}