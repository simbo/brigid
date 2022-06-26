import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { env } from '../../lib/env';
import { User } from '../users/user.entity';

export const database = new DataSource({
  type: 'mysql',
  host: env.db.host,
  port: env.db.port,
  username: env.db.user,
  password: env.db.password,
  database: env.db.name,
  synchronize: !env.isProduction,
  logging: false,
  entities: [User],
  migrations: [],
  migrationsTableName: 'migrations',
  subscribers: []
});
