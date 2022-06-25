import { server as hapiServer, Server } from '@hapi/hapi';

import { serverOptions } from './server-options';
import { registerPlugins } from './server-plugins';

export async function startServer(): Promise<Server> {
  const server = hapiServer(serverOptions);
  await registerPlugins(server);
  await server.start();
  return server;
}
