import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@shqipet/config';
import { GeoModule } from '@shqipet/geo';

import { MeController, GoogleTokenManagerService, UsersService, IpMiddleware } from './me';

@Module({
  imports: [ ConfigModule, GeoModule ],
  controllers: [ MeController ],
  providers: [ IpMiddleware, GoogleTokenManagerService, UsersService ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IpMiddleware)
      .forRoutes(MeController)
  }
}
