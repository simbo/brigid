import { Plugin } from '@hapi/hapi';

import { logger, onLogEvent } from './logger';
import { formatRequest, formatServerStarted, formatServerStopped, formatServerStopping } from './logger-formats';

export const loggerPlugin: Plugin<{}> = {
  name: 'logger',

  register: async (server): Promise<void> => {
    server.events.on('log', async (event, tags) => {
      onLogEvent(event, tags);
    });

    // server.ext('onRequest', async (request, h) => {
    //   logger.http(formatRequest(request));
    //   return h.continue;
    // });

    server.events.on('request', async (request, event, tags) => {
      onLogEvent(event, tags, request);
    });

    server.events.on('response', async request => {
      logger.http(formatRequest(request));
    });

    // server.ext('onPreStart', async () => {
    //   logger.info(formatServerStarting());
    // });

    server.ext('onPostStart', async () => {
      logger.info(formatServerStarted(server));
    });

    server.ext('onPreStop', async () => {
      logger.info(formatServerStopping());
    });

    server.ext('onPostStop', async () => {
      logger.info(formatServerStopped());
    });
  }
};
