import { logger } from '../modules/logger/logger';

/**
 * Exit the process on uncaught errors
 * @param err error
 */
export function dieOnError(err: Error): void {
  logger.error(err.message || err);
  process.exit(1);
}
