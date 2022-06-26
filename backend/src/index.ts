import { dieOnError } from './lib/die-on-error';
import { handleProcess } from './lib/handle-process';
import { logger } from './modules/logger/logger';
import { formatServerStarting } from './modules/logger/logger-formats';
import { startServer } from './modules/server/start-server';

logger.log('info', formatServerStarting());
startServer().then(handleProcess).catch(dieOnError);
