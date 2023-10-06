import { Module } from '@nestjs/common';
import { ConfigModule } from '@shqipet/config';
import { GeoModule } from '@shqipet/geo';
import { CacheModule } from '@shqipet/cache';
import { ConfigService } from '@nestjs/config';

import { AuthManager, IpExtractor, CorsManager, MessageFormatter } from './components';
import { GeoMap, GeoHandler, RoomMap, RoomHandler, MessagesHandler } from './handlers';
import { WsGateway } from './ws.gateway';

@Module({
  imports: [
    ConfigModule,
    GeoModule,
    CacheModule,
  ],
  providers: [
    {
      provide: AuthManager,
      useFactory: (configService) => {
        const cookieName = configService.getOrThrow('COOKIE');
        return new AuthManager(cookieName);
      },
      inject: [ ConfigService ],
    },
    {
      provide: IpExtractor,
      useFactory: (configService) => {
        const domain = configService.getOrThrow('DOMAIN');
        return new IpExtractor(domain);
      },
      inject: [ ConfigService ],
    },
    {
      provide: CorsManager,
      useFactory: (configService) => {
        const domain = configService.getOrThrow('DOMAIN');
        return new CorsManager(domain);
      },
      inject: [ ConfigService ],
    },
    MessageFormatter,
    GeoMap,
    GeoHandler,
    RoomMap,
    RoomHandler,
    MessagesHandler,
    WsGateway,
  ],
})
export class AppModule {}
