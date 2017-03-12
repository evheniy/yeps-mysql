const debug = require('debug')('yeps:mysql');
const mysql = require('promise-mysql');
const config = require('config');
const pool = mysql.createPool(config.mysql);

debug(config.mysql);

module.exports  = pool;
