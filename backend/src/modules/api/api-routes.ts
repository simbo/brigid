import { ServerRoute } from '@hapi/hapi';

export const apiRoutes: ServerRoute[] = [
  {
    method: 'GET',
    path: '/foo',
    handler: async (request, h) => {
      return { foo: 'bar' };
    }
  }
];
