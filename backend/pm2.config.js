'use strict';

const pkgJson = require('./package.json');

module.exports = {
  apps: [
    {
      // environment vars
      env: {
        NODE_ENV: 'production'
      },

      // logging
      log_date_format: 'YYYY-MM-DD HH:mm:ss.SSS Z',

      // process
      kill_timeout: 10000,
      name: pkgJson.name,
      script: 'dist/index.js'
    }
  ]
};
