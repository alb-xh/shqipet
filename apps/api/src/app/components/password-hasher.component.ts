import { hash } from 'bcrypt';

import { Injectable, Optional } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class PasswordHasher {
  private readonly salt: string;

  constructor(
    configService: ConfigService,
    @Optional()
    private readonly hashAlgo = hash,
  ) {
    this.salt = configService.getOrThrow('PASSWORD_SALT');
  }

  hash (password: string): Promise<string> {
    return this.hashAlgo(password, this.salt);
  }
}
