/**
 * This file alters the webpack config for all build tasks like `ng build` or
 * `ng test` using ngx-build-plus.
 *
 * This is needed for:
 *   - injecting custom postcss plugins
 *       - autoprefixer with custom options
 *       - mqpacker
 *   - custom scss options
 *       - importing global env vars into all scss files
 *       - enabling webpack imports (with leading ~)
 *       - setting default import directories for scss files
 *   - adding support for mjs modules (needed by @owc/* dependencies)
 *   - setting global variables for the build context
 *       - app name, description and version
 *       - commit id
 *   - setting a custom webpackJsonp function name to avoid conflicts
 */

const { DefinePlugin } = require('webpack');
const { resolve } = require('path');
const { execSync } = require('child_process');
const autoprefixer = require('autoprefixer');
const mqpacker = require('mqpacker');
const cssMqpackerSortMediaqueries = require('css-mqpacker-sort-mediaqueries');

// custom postcss plugins
const postcssPlugins = [
  autoprefixer({
    remove: false
  }),
  mqpacker({
    sort: cssMqpackerSortMediaqueries
  })
];

// get package infos for env constants
const pkg = require('./package.json');

// get commit id for env constants
const commitId = execSync(`git log --pretty=format:'%h' -n 1`, { stdout: '' }).toString();

exports.default = {
  config: config => {
    // customize rules
    config.module.rules.forEach(rule => {
      // walk through scss rules
      if (`${rule.test}` === '/\\.(?:scss)$/i') {
        rule.rules[0].oneOf.forEach(oneOfRule => {
          oneOfRule.use.forEach(use => {
            // apply custom postcss plugins
            if (/\/postcss-loader\//.test(use.loader)) {
              // keep angular's postcss options creator to reuse in custom implementation
              const postcssOptionsCreator = use.options.postcssOptions;
              // custom postcss options creator
              use.options.postcssOptions = (...args) => {
                // use angular's postcss options creator
                const postcssOptions = postcssOptionsCreator(...args);
                // avoid angular's autoprefixer config
                plugins = postcssOptions.plugins.filter(plugin => plugin.postcssPlugin !== 'autoprefixer');
                // add autoprefixer with custom config including other custom plugins
                plugins.push(...postcssPlugins);
                postcssOptions.plugins = plugins;
                // postcssOptions.syntax = 'postcss-scss';
                return postcssOptions;
              };
            }
          });
        });
        rule.rules[1].use.forEach(use => {
          // apply custom scss options
          if (/\/sass-loader\//.test(use.loader)) {
            // prepend env file to every sass file
            use.options.additionalData = "@use 'sass:math' as math; @use '@angular/material' as mat; @import \"env\";";
            // support importing sass files from node_modules by simple prepending a `~`
            use.options.webpackImporter = true;
            // set `./src/styles` as base path for every sass import
            use.options.sassOptions.includePaths = [resolve(__dirname, 'src', 'styles')];
          }
        });
      }
    });

    // add support for mjs modules (used by packages from @owc/*)
    config.module.rules.unshift({
      type: 'javascript/auto',
      test: /\.mjs$/,
      use: []
    });

    // prepend DefinePlugin to provide env constants in TS context
    config.plugins.unshift(
      new DefinePlugin(
        Object.entries({
          BRIGID_APP_NAME: pkg.name,
          BRIGID_APP_DESCRIPTION: pkg.description,
          BRIGID_APP_VERSION: pkg.version,
          BRIGID_COMMIT_ID: commitId
        }).reduce((globals, [key, value]) => ({ ...globals, [key]: JSON.stringify(value) }), {})
      )
    );

    // customize webpacks jsonp function name to avoid conflicts with other webpack bundles in scope
    config.output.chunkLoadingGlobal = 'webpackJsonpBrigidFrontend';

    return config;
  }
};
