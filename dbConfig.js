'use strict';
const url = require('url');

const params = url.parse(process.env.DATABASE_URL);
let auth;
if (params.auth) {
  auth = params.auth.split(':');
} else {
  auth = [];
}

module.exports = {
  user: process.env.RDS_USER || auth[0],
  password: process.env.RDS_PASSWORD || auth[1],
  host: process.env.RDS_HOSTNAME || params.hostname,
  port: process.env.RDS_PORT || params.port,
  database: params.pathname.split('/')[1],
};
