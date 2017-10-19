'use strict';
const basicAuth = require('express-basic-auth');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const logger = require('morgan');
const path = require('path');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const verifyLoggedInUser = require('./lib/verifyLoggedInUser');

const index = require('./routes/index');
const login = require('./routes/login');
const users = require('./routes/users');
const hikes = require('./routes/hikes');
let server;
let debug;
let app = express();

if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('mock-project-server:server');
  const http = require('http');
  const port = normalizePort(process.env.PORT || '3001');
  app.set('port', port);

  server = http.createServer(app);

  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
  console.log(`Server listening on port: ${port}`);
}

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

//app.configure(function(){
//  app.set('views', __dirname + '/views');
//  app.set('view engine', 'jade');
//  app.use(express.static(path.join(__dirname, 'public')));
//});

// app.use(logger('dev'));
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/login', login);

// basic auth is a security requirement while in development
// to authenticate:
//   via the browser: enter mock & password in the popup
//   via curl: add `-u mock:password` to requests
//   via ajax: add the following header:
//     'Authorization': 'Basic ' + btoa('mock:password')
// app.use(
//   basicAuth({
//     users: { mock: 'password' },
//     challenge: true,
//   })
// );

app.use('/', index);
app.use('/users', users);
app.use('/hikes', hikes);
// app.use(verifyLoggedInUser);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

module.exports = app;
