import { Module } from '@nestjs/common';
import { ConfigModule } from '@shqipet/config';

import { AppController } from './iam.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
