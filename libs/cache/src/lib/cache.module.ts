import { Module } from '@nestjs/common';

import { InMemoryCacheService } from './services';

@Module({
  providers: [ InMemoryCacheService ],
  exports: [ InMemoryCacheService ],
})
export class CacheModule {}
