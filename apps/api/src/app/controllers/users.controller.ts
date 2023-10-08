import { Body, Controller, ForbiddenException, Get, NotFoundException, Param, Post } from "@nestjs/common";
import { UserResponse } from "@shqipet/common";

import { CreateUserDto } from "../dtos";
import { UseThrottle } from "../decorators";
import { UsersService } from "../services/users.service";

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get(':username')
  async getUserByUsername(@Param('username') username: string): Promise<UserResponse> {
    const user = await this.usersService.getUser(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePictureUrl: user.profilePictureUrl,
      bio: user.bio,
    }
  }

  @Post()
  @UseThrottle(10, 60)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    if (await this.usersService.userExists(createUserDto.username)) {
      throw new ForbiddenException('User already exists');
    }

    await this.usersService.createUser(createUserDto);
  }
}