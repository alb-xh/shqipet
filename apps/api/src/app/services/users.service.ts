import { Injectable, Optional } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUser, PublicUser, randomId } from "@shqipet/common";
import { User } from "@shqipet/db";
import { Repository } from "typeorm";
import { PasswordHasher } from "../components";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly passwordHasher: PasswordHasher,
    @Optional()
    private readonly generateId = randomId,
  ) {}

  async userExists (usernameOrId: string | number): Promise<boolean> {
    return typeof usernameOrId === 'number'
      ? this.userRepository.exist({ where: { id: usernameOrId } })
      : this.userRepository.exist({ where: { username: usernameOrId } });
  }

  async getUser (usernameOrId: string | number): Promise<User> {
    return typeof usernameOrId === 'number'
      ? this.userRepository.findOneBy({ id: usernameOrId })
      : this.userRepository.findOneBy({ username: usernameOrId });
  }

  async getPublicUser (usernameOrId: string | number): Promise<PublicUser> {
    const user = await this.getUser(usernameOrId);

    return {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePictureUrl: user.profilePictureUrl,
      bio: user.bio,
    };
  }

  async createUser (userData: CreateUser): Promise<User> {
    const { password, ...rest } = userData;

    const hashedPassword = await this.passwordHasher.hash(password);
    const user = this.userRepository.create({
      ...rest,
      password: hashedPassword,
      resetPasswordCode: this.generateId(6),
      resetPasswordAttempts: 0,
    });

    await this.userRepository.save(user);

    return user;
  }

  async deleteUser (usernameOrId: string | number): Promise<void> {
    const user = await this.getUser(usernameOrId);

    await this.userRepository.delete(user);
  }

  async isUserPasswordValid (usernameOrIdOrUser: string | number | User, password: string): Promise<boolean> {
    const user = typeof usernameOrIdOrUser !== 'object'
      ? await this.getUser(usernameOrIdOrUser)
      : usernameOrIdOrUser;

    if (!user) {
      return false;
    }

    const hashedPassword = await this.passwordHasher.hash(password);

    return user.password === hashedPassword;
  }

  async updateUserPassword (usernameOrId: string | number, password: string): Promise<void> {
    const user = await this.getUser(usernameOrId);
    const hashedPassword = await this.passwordHasher.hash(password);

    user.password = hashedPassword;

    await this.userRepository.save(user);
  }
}
