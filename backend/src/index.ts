import { dieOnError } from './lib/die-on-error';
import { handleProcess } from './lib/handle-process';
import { database } from './modules/database/database';
import { logger } from './modules/logger/logger';
import { formatServerStarting } from './modules/logger/logger-formats';
import { startServer } from './modules/server/start-server';

new Promise<void>(resolve => {
  logger.log('info', formatServerStarting());
  resolve();
})
  .then(() => database.initialize())
  .then(() => startServer())
  .then(handleProcess)
  .catch(dieOnError);
