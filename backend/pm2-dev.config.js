'use strict';

const prodConfig = require('./pm2.config');

module.exports = {
  apps: [
    {
      // inherit from prodConfig
      ...prodConfig.apps[0],

      // environment vars
      env: {
        FORCE_COLOR: 1,
        NODE_ENV: 'development'
      },

      // logging
      error_file: '/dev/null',
      out_file: '/dev/null',
      log_date_format: 'HH:mm:ss.SSS',

      // watch options
      ignore_watch: ['node_modules'],
      watch: ['src/**/*', 'package.json', 'tsconfig.json', '.env'],
      watch_delay: 1000,
      watch_options: {
        followSymlinks: false
      },

      // process
      autorestart: false,
      script: 'ts-node --log-error --project tsconfig.json src/index.ts'
    }
  ]
};
