import { Module } from '@nestjs/common';
import { ConfigModule } from '@shqipet/config';
import { GeoModule } from '@shqipet/geo';
import { AuthModule, GoogleAuthService } from '@shqipet/auth';
import { CacheModule } from '@shqipet/cache';
import { ConfigService } from '@nestjs/config';


import { WsGateway } from './ws.gateway';
import { GeoMap, RoomMap } from './maps';
import { AuthManager, IpExtractor, MessageFormatter } from './components';

@Module({
  imports: [ ConfigModule, AuthModule, GeoModule, CacheModule ],
  providers: [
    {
      provide: AuthManager,
      useFactory: (GoogleAuthService, configService) => {
        const cookieName = configService.getOrThrow('COOKIE');
        return new AuthManager(GoogleAuthService, cookieName);
      },
      inject: [ GoogleAuthService, ConfigService ],
    },
    {
      provide: IpExtractor,
      useFactory: (configService) => {
        const domain = configService.getOrThrow('DOMAIN');
        return new IpExtractor(domain);
      },
      inject: [ ConfigService ],
    },
    GeoMap,
    RoomMap,
    MessageFormatter,
    WsGateway
  ],
})
export class AppModule {}
