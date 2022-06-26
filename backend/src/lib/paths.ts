import { dirname, join } from 'path';

/**
 * Absolute paths
 */
// /[...]/backend/src
export const PATH_SRC_ABS = dirname(__dirname);
// /[...]/backend
export const PATH_ROOT_ABS = dirname(PATH_SRC_ABS);
// /[...]/backend/dist
export const PATH_DIST_ABS = join(PATH_ROOT_ABS, 'dist');
// /[...]/frontend/dist
export const PATH_CLIENT_ABS = join(dirname(PATH_ROOT_ABS), 'frontend', 'dist');
