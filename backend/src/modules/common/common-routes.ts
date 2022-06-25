import { ServerRoute } from '@hapi/hapi';

import { PATH_CLIENT_ABS } from '../../lib/paths';

export const commonRoutes: ServerRoute[] = [
  {
    method: 'GET',
    path: '/{param*}',
    handler: { directory: { path: PATH_CLIENT_ABS } }
  }
];
