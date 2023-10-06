import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { options } from './dataSource.js';
import * as entitiesObj from './entities';

const entities = Object.values(entitiesObj)

@Module({
  imports: [
    TypeOrmModule.forRoot(options),
    TypeOrmModule.forFeature(entities),
  ],
  exports: [ TypeOrmModule ]
})
export class DbModule {}
