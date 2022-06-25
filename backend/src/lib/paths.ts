import { dirname, join } from 'path';

// absolute paths
export const PATH_SRC_ABS = dirname(__dirname); // = /backend/src
export const PATH_ROOT_ABS = dirname(PATH_SRC_ABS); // = /backend
export const PATH_DIST_ABS = join(PATH_ROOT_ABS, 'dist'); // = /backend/dist
export const PATH_CLIENT_ABS = join(dirname(PATH_ROOT_ABS), 'frontend', 'dist');
