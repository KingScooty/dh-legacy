'use strict';

/**
 * Default configuration manager
 * Inject app and express reference
 */

module.exports.init = function init(env) {
  var envSettings;

  // -- DEVELOPMENT
  if (env === 'development') {
    envSettings = require('./environment/development');
  }

  // -- PRODUCTION
  if (env === 'production') {
    envSettings = require('./environment/production');
  }

  // -- TEST
  if (env === 'test') {
    envSettings = require('./environment/test');
  }

  // exports.settings = envSettings.settings;
  return envSettings;
};
