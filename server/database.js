module.exports.connectDatabase = function (settings) {

  var cradle = require('cradle');

  cradle.setup({
    host: settings.database.host,
    port: 5984,
    cache: true,
    raw: false,
    forceSave: true,
    auth: settings.database.auth
  });

  var c = new(cradle.Connection);

  var db = c.database(settings.database.name);

  exports.db = db;
}

module.exports.databaseExists = function (db, callback) {

  db.exists(function (err, exists) {
    if (err) {
      console.log('error', err);
    } else if (exists) {
      console.log('the force is with you.');
    } else {
      console.log('database does not exists.');
      db.create(function(err, res) {
        console.log('Database created.');
        callback();
      });

    }
  });

}

module.exports.createTestFixture = function (db) {

  var fixture = require('./fixture.js');
  var tweets = fixture.tweets;

  for (var i = 0; i < tweets.length; i++) {
    db.save(tweets[i].id_str, tweets[i], function (err, res) {
      if (err) {
        console.log('error', err);
      } else {
        console.log('Fixture entry added to database');
      }
    });
  }

}

module.exports.createView = function (db, callback) {

  console.log('Creating database view');

  db.save('_design/tweets', {
    all: {
      map: function (doc) {
        if (doc._id) emit(doc._id, doc);
      }
    },
    screen_name: {
      map: function (doc) {
        if (doc.user.screen_name) emit(doc.user.screen_name, doc);
      }
    },
    favourited: {
      map: function (doc) {
        if (doc.user.screen_name && doc.favourited == true) {
          emit(null, doc);
        }
      }
    }
  }, function(err, res) {
    if (err) {
      console.log('error', err);
    } else {
      callback();
    }
  });
}

// module.exports.loadDatabaseData = function (db) {
//
//   var dbContent = [];
//
//   db.view('tweets/all', function (err, res) {
//     res.forEach(function (key, row, id) {
//       dbContent.push(row);
//     });
//     return dbContent;
//   });
//
// }
