import { Module } from '@nestjs/common';
import { ConfigModule } from '@shqipet/config';
import { DbModule, User } from '@shqipet/db';
import { UsersController } from './controllers';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule,
    DbModule,
  ],
  controllers: [
    UsersController,
  ],
})
export class AppModule {}
