const debug = require('debug')('yeps:mysql');
const pool = require('./pool');

module.exports = () => async (context) => {
  debug('MySQL client created');

  context.mysql = pool;
};
