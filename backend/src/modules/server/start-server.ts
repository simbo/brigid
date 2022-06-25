import { server as hapiServer, Server } from '@hapi/hapi';

import { serverOptions } from './server-options';
import { registerPlugins } from './server-plugin-registration';
import { serverPlugins } from './server-plugins';

/**
 * Start the server
 * @returns Server
 */
export async function startServer(): Promise<Server> {
  const server = hapiServer(serverOptions);
  await registerPlugins(server, serverPlugins);
  await server.start();
  return server;
}
