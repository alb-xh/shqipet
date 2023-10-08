import { Body, Controller, ForbiddenException, Get, NotFoundException, Param, Post } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "@shqipet/db";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dtos";
import { UserResponse } from "@shqipet/common";

@Controller('users')
export class UsersController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Get(':username')
  async getUserByUsername(@Param('username') username: string): Promise<UserResponse> {
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

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    if (await this.userRepository.exist({ where: { username: createUserDto.username } })) {
      throw new ForbiddenException('User already exists');
    }

    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
  }
}