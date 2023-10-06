import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { omit } from 'lodash';

import { options } from './dataSource';
import * as entitiesObj from './entities';

const entities = Object.values(entitiesObj)

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...omit(options, ['entities', 'migrations']),
      entities,
    }),
    TypeOrmModule.forFeature(entities),
  ],
  exports: [ TypeOrmModule ]
})
export class DbModule {}
