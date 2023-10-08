import { Injectable, Optional } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUser, randomId } from "@shqipet/common";
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

  async createUser (userData: CreateUser): Promise<void> {
    const { password, ...rest } = userData;

    const hashedPassword = await this.passwordHasher.hash(password);
    const user = this.userRepository.create({
      ...rest,
      password: hashedPassword,
      resetPasswordCode: this.generateId(6),
      resetPasswordAttempts: 0,
    });

    await this.userRepository.save(user);
  }
}
