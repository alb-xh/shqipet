import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { isProduction } from "@shqipet/common";
import { User } from "@shqipet/db";
import { Request, Response, CookieOptions } from 'express';
import { omit } from "lodash";

@Injectable()
export class AuthService {
  private readonly publicUserFields: (keyof User)[] = ['id'];
  private readonly secret: string;
  private readonly cookieName: string;
  private readonly cookieOptions: CookieOptions;

  constructor(
    private readonly jwtService: JwtService,
    configService: ConfigService,
  ) {
    this.secret = configService.getOrThrow('AUTH_TOKEN_SECRET');
    this.cookieName = configService.getOrThrow('AUTH_COOKIE_NAME');
    this.cookieOptions = {
      httpOnly: true,
      secure: isProduction(),
      sameSite: 'strict',
      domain: configService.getOrThrow('DOMAIN'),
    };
  }

  private getToken(request: Request): string | undefined {
    return request.cookies[this.cookieName];
  }

  async getUser (tokenOrRequest: string | Request): Promise<Partial<User> | null> {
    const token = typeof tokenOrRequest === 'object'
      ? this.getToken(tokenOrRequest)
      : tokenOrRequest;

    if (!token) {
      return null;
    }

    try {
      const userData = await this.jwtService.verify(token, { secret: this.secret });

      const user = new User();
      Object.assign(user, userData);

      return user;
    } catch {
      return null;
    }
  }

  async generateToken (user: User): Promise<string> {
    return this.jwtService.signAsync(
      omit(user, this.publicUserFields),
      { secret: this.secret },
    );
  }

  async signIn (user: User, res: Response): Promise<void> {
    const token = await this.generateToken(user);

    res.cookie(this.cookieName, token, this.cookieOptions);
  }

  async signOut (res: Response): Promise<void> {
    res.clearCookie(this.cookieName, this.cookieOptions);
  }
}
