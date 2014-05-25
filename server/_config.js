/**
 * Default configuration manager
 * Inject app and express reference
 */

module.exports.init = function(app) {

  var envSettings;

  // -- DEVELOPMENT
  if ('development' == app.settings.env) {
    envSettings = require("./environment/development");
  }

  // -- PRODUCTION
  if ('production' == app.settings.env) {
    envSettings = require("./environment/production");
  }

  // -- TEST
  if ('test' == app.settings.env) {
    envSettings = require("./environment/test");
  }

  exports.settings = envSettings.settings;

};