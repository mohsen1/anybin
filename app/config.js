'use strict';

module.exports = {
  development: {
    db: {
      url: 'mongodb://admin:admin@ds035750.mongolab.com:35750/bins-dev'
    },
    server: {
      port: 3000
    }
  },
  test: {
    db: {
      url: 'mongodb://admin:admin@ds035750.mongolab.com:35750/bins-test'
    },
    server: {
      port: 3000
    }
  },
  production: {
    db: {
      url: 'mongodb://admin:admin@ds035300.mongolab.com:35300/bins'
    },
    server: {
      port: 80
    }
  }
};