import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = await this.authService.getUser(request);
    if (!user) {
      throw new UnauthorizedException();
    }

    request['user'] = user;

    return true;
  }
}