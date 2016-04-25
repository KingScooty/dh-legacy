// require("./src/server")(function (app) {
//   console.log("Express %s server listening on %s:%s", app.get("env"), app.get("host"), app.get("port"));
//
//   // if (app.get("env") === "development") {
//   //   require("./webpack/server")();
//   // }
//
// });
//



'use strict';

console.log(`Starting server at ${(new Date).toISOString()}`);
process.on('exit', () => {
  console.log(`Process exit at ${(new Date).toISOString()}`);
});

const web = require('./src/server');
const spdy = require('spdy');

const getServer = () => {
  const server = spdy.createServer({
    spdy: {
      plain: true,
      ssl: false,
    },
  }, web.callback());

  // const io = socketIo.listen(server);
  // const dbFeed = require('./db_feed');
  // const eventSockets = require('./sockets').socketsInit(io, dbFeed);

  return server;
};

getServer().listen(1337, () => {
  console.log('HTTP server listening on port 1337');
});
