import { ServerOptions } from '@hapi/hapi';

import { env } from '../../lib/env';

const { port, host } = env.app;

/**
 * Server options
 */
export const serverOptions: ServerOptions = {
  port,
  host,
  debug: env.isProduction ? false : { log: ['*'], request: ['*'] },
  router: {
    stripTrailingSlash: true
  },
  routes: {}
};
