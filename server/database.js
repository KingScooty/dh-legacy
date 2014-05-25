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

  var db = c.database('digitalheroes-2014');

  db.exists(function (err, exists) {
    if (err) {
      console.log('error', err);
    } else if (exists) {
      console.log('the force is with you.');
    } else {
      console.log('database does not exists.');
      // db.create();
      /* populate design documents */
    }
  });

  exports.db = db;

  // db.save('skywalker', {
  //     force: 'light',
  //     name: 'Luke Skywalker'
  // }, function (err, res) {
  //     if (err) {
  //       console.log('Save failed!');
  //         // Handle error
  //     } else {
  //       console.log('Save success!');
  //         // Handle success
  //     }
  // });

  // db.remove('skywalker', function (err, res) {
  //   // Handle response
  //   if (err) {
  //     console.log('Remove failed');
  //   } else {
  //     console.log('Remove: Sucess');
  //   }
  // });

}