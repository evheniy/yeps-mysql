# YEPS MySQL


YEPS Promise based mysql client

[![NPM](https://nodei.co/npm/yeps-mysql.png)](https://npmjs.org/package/yeps-mysql)

[![npm version](https://badge.fury.io/js/yeps-mysql.svg)](https://badge.fury.io/js/yeps-mysql)
[![Build Status](https://travis-ci.org/evheniy/yeps-mysql.svg?branch=master)](https://travis-ci.org/evheniy/yeps-mysql)
[![Coverage Status](https://coveralls.io/repos/github/evheniy/yeps-mysql/badge.svg?branch=master)](https://coveralls.io/github/evheniy/yeps-mysql?branch=master)
[![Linux Build](https://img.shields.io/travis/evheniy/yeps-mysql/master.svg?label=linux)](https://travis-ci.org/evheniy/)
[![Windows Build](https://img.shields.io/appveyor/ci/evheniy/yeps-mysql/master.svg?label=windows)](https://ci.appveyor.com/project/evheniy/yeps-mysql)

[![Dependency Status](https://david-dm.org/evheniy/yeps-mysql.svg)](https://david-dm.org/evheniy/yeps-mysql)
[![devDependency Status](https://david-dm.org/evheniy/yeps-mysql/dev-status.svg)](https://david-dm.org/evheniy/yeps-mysql#info=devDependencies)
[![NSP Status](https://img.shields.io/badge/NSP%20status-no%20vulnerabilities-green.svg)](https://travis-ci.org/evheniy/yeps-mysql)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/evheniy/yeps-mysql/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/evheniy/yeps-mysql.svg)](https://github.com/evheniy/yeps-mysql/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/evheniy/yeps-mysql.svg)](https://github.com/evheniy/yeps-mysql/network)
[![GitHub issues](https://img.shields.io/github/issues/evheniy/yeps-mysql.svg)](https://github.com/evheniy/yeps-mysql/issues)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/evheniy/yeps-mysql.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=%5Bobject%20Object%5D)


## How to install

    npm i -S yeps-mysql
    
## How to use

### Config

config/default.json

    {
        "mysql": {
            "host": "127.0.0.1",
            "port": 3306,
            "user": "user",
            "password": "password",
            "database": "database",
            "connectionLimit": 10
         }
    }

### Middleware

    const App = require('yeps');
    const app = new App();
    const error = require('yeps-error');
    const logger = require('yeps-logger');
    
    const mysql = require('yeps-mysql');
    
    app.all([
        mysql(),
        error(),
        logger()
    ]);
    
    app.then(async ctx => {
        const connection = await ctx.mysql.getConnection();
        const rows = await connection.query('select * from users;');
        ctx.mysql.releaseConnection(connection);
    });
    
### In module

    const pool = require('yeps-mysql/pool');
    const logger = require('yeps-logger/logger');
    
    async () => {
        try {
            
            const connection = await pool.getConnection();
            const rows = await connection.query('select * from users;');
            pool.releaseConnection(connection);        

        } catch (error) {
            logger.error(error);
        }
    };
    
## Links

* [YEPS documentation](http://yeps.info/)
* [promise-mysql](https://github.com/lukeb-uk/node-promise-mysql) - promise based mysql client
* [config](https://github.com/lorenwest/node-config) - node.js config
