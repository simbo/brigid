import { ServerRoute } from '@hapi/hapi';

export const apiRoutes: ServerRoute[] = [
  {
    method: 'GET',
    path: '/foo',
    options: {
      description: 'a dummy route for testing'
    },
    handler: async (request, h) => {
      return { foo: 'bar' };
    }
  }
];
