import { Module } from '@nestjs/common';
import { ConfigModule } from '@shqipet/config';
import { DbModule } from '@shqipet/db';
import { ThrottlerModule } from '@nestjs/throttler';
import { UsersController } from './controllers';
import { UsersService } from './services/users.service';
import { PasswordHasher } from './components';

@Module({
  imports: [
    ConfigModule,
    DbModule,
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100,
    }]),
  ],
  providers: [
    UsersService,
    PasswordHasher,
  ],
  controllers: [
    UsersController,
  ],
})
export class AppModule {}
