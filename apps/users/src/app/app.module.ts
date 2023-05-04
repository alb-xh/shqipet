import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@shqipet/config';
import { GeoModule } from '@shqipet/geo';

import { MeController, GoogleTokenManagerService, UsersService, IpMiddleware } from './me';
import { StorageModule } from '@shqipet/storage';

@Module({
  imports: [ ConfigModule, GeoModule, StorageModule ],
  controllers: [ MeController ],
  providers: [ IpMiddleware, GoogleTokenManagerService, UsersService ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IpMiddleware)
      .forRoutes(MeController)
  }
}
