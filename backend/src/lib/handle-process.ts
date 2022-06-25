import { dieOnError } from './die-on-error';

/**
 * Handle process behavior for uncaught errors and rejections
 */
export function handleProcess(): void {
  process.on('uncaughtException', dieOnError);
  process.on('unhandledRejection', dieOnError);
}
