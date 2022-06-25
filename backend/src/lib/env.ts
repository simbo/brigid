import { config } from 'dotenv';
import { join } from 'path';

import { PATH_ROOT_ABS } from './paths';

const envPath = join(PATH_ROOT_ABS, '.env');

config({ path: envPath });

const { NODE_ENV, APP_HOST, APP_PORT, APP_SSL } = process.env as { [key: string]: string };

const envVars = {
  APP_HOST,
  APP_PORT,
  APP_SSL
};

const undefinedEnvVars = Object.entries(envVars)
  .filter(([key, value]) => value === undefined)
  .map(([key]) => key);

if (undefinedEnvVars.length) {
  throw new Error(
    `Undefined ENV variable${undefinedEnvVars.length > 1 ? 's' : ''}: "${undefinedEnvVars.join('", "')}"`
  );
}

export const env = {
  isProduction: NODE_ENV === 'production',
  isDevelopment: NODE_ENV !== 'production',
  app: {
    host: APP_HOST,
    port: parseInt(APP_PORT, 10),
    ssl: APP_SSL === 'true'
  }
};
