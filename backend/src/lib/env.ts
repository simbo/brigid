import { execSync } from 'child_process';
import { config } from 'dotenv';
import { join } from 'path';

import * as pkgJson from '../../package.json';
import { PATH_ROOT_ABS } from './paths';

/**
 * Read env file and set contents to process.env
 */
const envPath = join(PATH_ROOT_ABS, '.env');
config({ path: envPath });

/**
 * Get env vars from process.env
 */
const { NODE_ENV, APP_HOST, APP_PORT, APP_SSL, MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } =
  process.env as {
    [key: string]: string;
  };

/**
 * Create basic env vars object
 */
const envVars = {
  APP_HOST,
  APP_PORT,
  APP_SSL,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE
};

/**
 * find undefined env vars
 */
const undefinedEnvVars = Object.entries(envVars)
  .filter(([key, value]) => value === undefined)
  .map(([key]) => key);
if (undefinedEnvVars.length) {
  throw new Error(
    `Undefined ENV variable${undefinedEnvVars.length > 1 ? 's' : ''}: "${undefinedEnvVars.join('", "')}"`
  );
}

/**
 * Provide enriched env vars object
 */
export const env = {
  isProduction: NODE_ENV === 'production',
  isDevelopment: NODE_ENV !== 'production',
  app: {
    name: pkgJson.name,
    description: pkgJson.description,
    version: pkgJson.version,
    commit: execSync(`git log --pretty=format:'%h' -n 1`).toString(),
    host: APP_HOST,
    port: parseInt(APP_PORT, 10),
    ssl: APP_SSL === 'true'
  },
  db: {
    host: MYSQL_HOST,
    port: parseInt(MYSQL_PORT, 10),
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    name: MYSQL_DATABASE
  }
};
