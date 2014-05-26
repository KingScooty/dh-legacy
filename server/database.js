// var db;

module.exports.connectDatabase = function (settings) {

  var cradle = require('cradle');

  cradle.setup({
    host: settings.database.host,
    port: 5984,
    cache: true,
    raw: false,
    forceSave: true
  });

  var c = new(cradle.Connection);

  var db = c.database(settings.database.name);

  exports.db = db;

}

module.exports.databaseExists = function (db) {

  db.exists(function (err, exists) {
    if (err) {
      console.log('error', err);
    } else if (exists) {
      console.log('the force is with you.');
    } else {
      console.log('database does not exists.');
      db.create(function(err, res) {
        console.log('Database created.');
      });

    }
  });

}
