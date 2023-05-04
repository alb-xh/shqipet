import { Module } from '@nestjs/common';
import { UsersMap } from './users.map';
import { ChatGateway } from './chat.gateway';

@Module({
  providers: [ UsersMap, ChatGateway ],
})
export class AppModule {}
