import { Module } from '@nestjs/common';
import { ConfigModule } from '@shqipet/config';
import { GeoModule } from '@shqipet/geo';

import { GeoMap } from './geo.map';
import { ChatGateway } from './chat.gateway';
import { MessageFormatter } from './message-formatter';
import { AuthModule } from '@shqipet/auth';

@Module({
  imports: [ ConfigModule, AuthModule, GeoModule ],
  providers: [ GeoMap, MessageFormatter, ChatGateway ],
})
export class AppModule {}
