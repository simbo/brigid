import { LogEvent, Request, RequestEvent } from '@hapi/hapi';
import { createLogger, format } from 'winston';
import { Console } from 'winston/lib/winston/transports';

import { env } from '../../lib/env';
import { formatEvent } from './logger-formats';

const { combine, simple, colorize } = format;

type LogTags = {
  [key: string]: true;
};

enum LogLevel {
  Error = 'error',
  Warn = 'warn',
  Info = 'info',
  Http = 'http',
  Verbose = 'verbose',
  Debug = 'debug',
  Silly = 'silly'
}

const logLevelColors = {
  [LogLevel.Error]: 'red',
  [LogLevel.Warn]: 'yellow',
  [LogLevel.Info]: 'green',
  [LogLevel.Http]: 'gray',
  [LogLevel.Verbose]: 'cyan',
  [LogLevel.Debug]: 'blue',
  [LogLevel.Silly]: 'magenta'
};

const logLevelIndex = Object.values(LogLevel).reduce(
  (levels, level, i) => ({ ...levels, [level]: i }),
  {} as { [key in LogLevel]: number }
);

export const logger = createLogger({
  level: env.isProduction ? LogLevel.Info : LogLevel.Silly,
  levels: logLevelIndex,
  transports: [new Console({ format: combine(colorize({ colors: logLevelColors }), simple()) })],
  exitOnError: false,
  silent: false
});

export function onLogEvent(event: LogEvent | RequestEvent, tags: LogTags, request?: Request) {
  if (tags.error) logger.error(formatEvent(event, request));
  else logger.log(getLogLevelFromTags(tags), formatEvent(event, request));
}

const reverseLogLevels = Object.entries(logLevelIndex)
  .sort((a, b) => a[1] - b[1])
  .map(([level]) => level)
  .reverse();

export function getLogLevelFromTags(tags: LogTags): string {
  for (let level of reverseLogLevels) if (tags[level]) return level;
  return 'info';
}
