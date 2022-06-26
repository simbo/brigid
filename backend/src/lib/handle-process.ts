import { Server } from '@hapi/hapi';

import { dieOnError } from './die-on-error';

/**
 * Handle process behavior
 */
export function handleProcess(server: Server): void {
  // catch uncaught exceptions and rejections
  process.on('uncaughtException', dieOnError);
  process.on('unhandledRejection', dieOnError);

  // function to be called on exit
  const onExit = () => {
    server
      .stop()
      .then(() => process.exit(0))
      .catch(dieOnError);
  };

  // gracefully shutdown when receiving an exit signal
  process.on('SIGINT', onExit);
  process.on('SIGTERM', onExit);
}
