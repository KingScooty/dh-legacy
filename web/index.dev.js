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

require('babel-register')();//('./src/server');
require("babel-polyfill");

console.log(`Starting server at ${(new Date()).toISOString()}`);
process.on('exit', () => {
  console.log(`Process exit at ${(new Date()).toISOString()}`);
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

getServer().listen(3000, () => {
  console.log('HTTP server listening on port 3000');
});


// we start a webpack-dev-server with our config
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');

new WebpackDevServer(webpack(config), {
  hot: true,
  historyApiFallback: true,
  proxy: {
   "*": "http://localhost:3000"
  }
}).listen(3001, 'localhost', function (err, result) {
  if (err) {
   console.log(err);
  }

  console.log('Listening at localhost:3001');
});
