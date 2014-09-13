'use strict';

var express = require('express');
var mongoose = require('mongoose');
var app = express();
var Bin = require('./models/Bin');
var environment = NODE_ENV || 'development';
var config = require('./config')[environment];


// Connect DB
var dbOptions = { server: { socketOptions: { keepAlive: 1 } } };
mongoose.connect(config.db.url, dbOptions);
mongoose.connection.on('error', function (err) {
  console.error('DB connection error');
  console.error(err);
});

app.get('/', function (req, res, next) {
  res.send('Welcome to HalfBin!\nTry POSTing to this URL.');
  next();
});

app.post('/', function (req, res, next) {
  var bin = new Bin;
  bin.save();
  res.send(bin);
});


app.listen(config.server.port, function (err) {
  if (!err) {
    return console.log('Server listening to ', config.server.port);
  }
  console.error('Error launching server');
  console.error(err);
});