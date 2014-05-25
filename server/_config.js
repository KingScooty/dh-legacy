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

  exports.settings = envSettings.settings;

};