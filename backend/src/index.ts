import { dieOnError } from './lib/die-on-error';
import { handleProcess } from './lib/handle-process';
import { startServer } from './modules/server/start-server';

startServer().then(handleProcess).catch(dieOnError);
