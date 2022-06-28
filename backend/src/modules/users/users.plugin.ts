import { Plugin } from '@hapi/hapi';

import { usersRoutes } from './users.routes';

export const usersPlugin: Plugin<{}> = {
  name: 'users',

  register: async (server): Promise<void> => {
    server.route(usersRoutes);
  }
};
