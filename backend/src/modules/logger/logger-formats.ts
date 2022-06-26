import { LogEvent, Request, RequestEvent, ResponseObject, Server } from '@hapi/hapi';
import { Chalk, cyan, dim, gray, green, red } from 'chalk';

import { env } from '../../lib/env';

export function formatEvent(event: LogEvent | RequestEvent, request?: Request): string {
  let msg: string;
  if (typeof event.data === 'string') msg = event.data;
  else if (event.data === undefined) msg = dim('(no message)');
  else msg = JSON.stringify(event.data);
  return request ? `${dim(request.path)} ${msg}` : msg;
}

export function formatRequest(request: Request): string {
  let statusColor: Chalk;
  let status = '';
  let responseTime = '';
  let method = request.method.toUpperCase();
  const remote = request.info.remoteAddress;
  const path = request.path;
  const query = JSON.stringify(request.query);
  if (request.response?.hasOwnProperty('statusCode')) {
    const code = (request.response as ResponseObject).statusCode;
    const { responded, received } = request.info;
    statusColor = code >= 200 && code < 300 ? green : red;
    status = statusColor(`${code}`);
    responseTime = dim(`(${responded - received}ms)`);
    method = statusColor(method);
  } else {
    method = gray(method);
  }
  return [method, remote, path, status, query, responseTime].filter(value => value !== '' && !!value).join(' ');
}

export function formatServerStarting(): string {
  return dim(`${env.app.name} starting...`);
}

export function formatServerStarted(server: Server): string {
  return [
    `${green(`${env.app.name} ${env.app.version} (${env.app.commit}) started`)}`,
    '@',
    `${cyan.underline(server.info.uri)}`
  ].join(' ');
}

export function formatServerStopping(): string {
  return dim(`${env.app.name} stopping...`);
}

export function formatServerStopped(): string {
  return `${red(`${env.app.name} stopped`)}`;
}
