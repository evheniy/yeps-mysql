const debug = require('debug')('yeps:mysql');
const mysql = require('promise-mysql');
const config = require('config');

debug(config.mysql);

module.exports = mysql.createPool(config.mysql);
