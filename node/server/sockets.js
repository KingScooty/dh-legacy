'use strict';
// module.exports.sockets = function (server) {
//
//   var io = require('socket.io');
//
//   io.sockets.on('connection', function (socket) {
//     socket.emit('news', { hello: 'world' });
//     socket.on('my other event', function (data) {
//       console.log(data);
//     });
//   });
//
// }

var io = require('socket-io');

function init_sockets(db) {
  io.sockets.on('connection', function callback(socket) {
    socket.on('greetingFromVisitor', function callback(message) {
      var dbContent = [];

      db.view('tweets/all', function callback(err, res) {
        if (err) {
          console.log(err);
        } else {
          res.forEach(function callback(key, row, id) {
            dbContent.push({ 'tweet': row });
          });
        }

        socket.emit('replyToGreeting', dbContent);
      });
    });
  });
}

module.exports = init_sockets;
