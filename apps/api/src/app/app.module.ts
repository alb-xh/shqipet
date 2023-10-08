import { Module } from '@nestjs/common';
import { ConfigModule } from '@shqipet/config';
import { DbModule } from '@shqipet/db';
import { ThrottlerModule } from '@nestjs/throttler';
import { JwtModule } from '@nestjs/jwt';

import { UsersController } from './controllers';
import { UsersService, AuthService } from './services';
import { PasswordHasher } from './components';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    DbModule,
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100,
    }]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('AUTH_TOKEN_SECRET'),
        signOptions: { expiresIn: configService.getOrThrow('AUTH_TOKEN_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    UsersService,
    PasswordHasher,
    AuthService,
  ],
  controllers: [
    UsersController,
  ],
})
export class AppModule {}
