import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GetUserByUsernameResponse } from '@shqipet/common';
import { User } from "@shqipet/db";
import { Repository } from "typeorm";


@Controller('users')
export class UsersController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Get(':username')
  async getUserByUsername(@Param('username') username: string): Promise<GetUserByUsernameResponse> {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      throw new NotFoundException();
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
}