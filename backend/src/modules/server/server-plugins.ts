import * as inert from '@hapi/inert';

import { apiPlugin } from '../api/api.plugin';
import { commonPlugin } from '../common/common.plugin';
import { loggerPlugin } from '../logger/logger.plugin';
import { PluginList } from './server-plugin-registration';

/**
 * List of server plugins
 */
export const serverPlugins: PluginList = [
  inert,
  loggerPlugin,
  [apiPlugin, { routes: { prefix: '/api' } }],
  commonPlugin
];
