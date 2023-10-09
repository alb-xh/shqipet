import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

const isProduction = process.env.NODE_ENV === 'production';
const envFile = isProduction ? '.prod.env' : '.dev.env';
const entitiesPath = isProduction ? 'dist/libs/db/src/lib/entities/*.entity.js' : 'libs/db/src/lib/entities/*.entity.ts';
const migrationsPath = isProduction ? 'dist/libs/db/src/lib/migrations/*.js' : 'libs/db/src/lib/migrations/*.ts';

dotenv.config({ path: envFile });

export const options = {
  serviceName: process.env.DB_SERVICE_NAME,
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [ entitiesPath ],
  migrations: [ migrationsPath ],
  migrationsTableName: "migrations",
  synchronize: false,
}

export default new DataSource(options);