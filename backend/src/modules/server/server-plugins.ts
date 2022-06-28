import * as inert from '@hapi/inert';

import { apiPlugin } from '../api/api.plugin';
import { commonPlugin } from '../common/common.plugin';
import { loggerPlugin } from '../logger/logger.plugin';
import { usersPlugin } from '../users/users.plugin';
import { PluginList } from './server-plugin-registration';

/**
 * List of server plugins
 */
export const serverPlugins: PluginList = [
  inert,
  loggerPlugin,
  [usersPlugin, { routes: { prefix: '/api/users' } }],
  [apiPlugin, { routes: { prefix: '/api' } }],
  commonPlugin
];
