/**
 * Default configuration manager
 * Inject app and express reference
 */

module.exports.init = function(app) {

  var envSettings;

  // -- DEVELOPMENT
  if ('development' == app.settings.env) {
    envSettings = require("./env/development");
  }

  // -- PRODUCTION
  if ('production' == app.settings.env) {
    envSettings = require("./environment/production");
  }

  // -- TEST
  if ('test' == app.settings.env) {
    envSettings = require("./env/test");
  }

  exports.settings = envSettings.settings;

};