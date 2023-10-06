import { Module } from '@nestjs/common';
import { ConfigModule } from '@shqipet/config';
import { DbModule } from '@shqipet/db';
import { UsersController } from './controllers';

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
