'use strict';

var argv = require('minimist')(process.argv.slice(2));

module.exports = {
  development: {
    db: {
      url: argv.db || '<YOUR DB URL HERE>'
    },
    server: {
      port: 3000
    }
  },
  test: {
    db: {
      url: argv.db || '<YOUR DB URL HERE>'
    },
    server: {
      port: 3000
    }
  },
  production: {
    db: {
      url: argv.db || '<YOUR DB URL HERE>'
    },
    server: {
      port: 80
    }
  }
};
