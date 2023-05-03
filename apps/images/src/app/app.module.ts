import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

const envFilePath = process.env['NODE' + '_ENV'] === 'production' ? '.prod.env' : '.dev.env';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath, isGlobal: true }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
