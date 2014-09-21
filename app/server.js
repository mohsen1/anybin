'use strict';

var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var argv = require('minimist')(process.argv.slice(2));
var cookieParser = require('cookie-parser')
require('./models/Bin');
var router = require('./router');
var app = express();
var environment = process.env.NODE_ENV || 'development';
var configFile = argv.config || './config';
var config = require(configFile)[environment];


// Connect DB
var dbOptions = { server: { socketOptions: { keepAlive: 1 } } };
mongoose.connect(config.db.url, dbOptions);
mongoose.connection.on('error', function (err) {
  console.error('DB connection error');
  console.error(err);
});

app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(morgan('combined'));
app.use(bodyParser.text());
app.use(cookieParser());
router(app);

var port = process.env.PORT || config.server.port;
app.listen(port, function (err) {
  if (!err) {
    return console.log('Server listening to ', port);
  }
  console.error('Error launching server');
  console.error(err);
});