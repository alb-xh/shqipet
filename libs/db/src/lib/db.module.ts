import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { options } from './dataSource';
import * as entitiesObj from './entities';
import { isProduction } from '@shqipet/common';

const entities = Object.values(entitiesObj)
const {
  serviceName,
  type,
  host,
  port,
  username,
  password,
  database,
  migrationsTableName,
  synchronize,
} = options;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type,
      host: isProduction() ? serviceName : host,
      port,
      username,
      password,
      database,
      migrationsTableName,
      synchronize,
      entities,
    }),
    TypeOrmModule.forFeature(entities),
  ],
  exports: [ TypeOrmModule ]
})
export class DbModule {}
