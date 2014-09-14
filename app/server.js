'use strict';

var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
require('./models/Bin');
var router = require('./router');
var app = express();
var environment = process.env.NODE_ENV || 'development';
var config = require('./config')[environment];


// Connect DB
var dbOptions = { server: { socketOptions: { keepAlive: 1 } } };
mongoose.connect(config.db.url, dbOptions);
mongoose.connection.on('error', function (err) {
  console.error('DB connection error');
  console.error(err);
});

app.use(morgan('combined'));
app.use(bodyParser.text());
router(app);

app.listen(config.server.port, function (err) {
  if (!err) {
    return console.log('Server listening to ', config.server.port);
  }
  console.error('Error launching server');
  console.error(err);
});