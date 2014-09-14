'use strict';

var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
require('./models/Bin');
var app = express();
var Bin = mongoose.model('Bin');
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

app.get('/', function (req, res, next) {
  res.send('Welcome to HalfBin!\nTry POSTing to this URL.');
  next();
});

// Make a new Bin
app.post('/', function (req, res, next) {
  Bin.create(req.body, function (err, bin){
    if (!err) { res.send(bin); }
    next();
  });
});

// Get latest version
app.get('/:id', function (req, res, next) {
  Bin.findById(req.params.id, function (err, bin) {
    if (!err) {
      bin.versions = bin.versions.splice(-1);
      res.send(bin);
    }
    next();
  });
});

// Update latest version
app.put('/:id', function (req, res, next) {
  Bin.findById(req.params.id, function (err, bin) {
    if (!err) {
      bin.versions.pop();
      bin.addVersion(req.body, function (err){
        if (!err) {
          res.send(bin);
        }
        next();
      });
    }
  });
});

// Add a new version
app.post('/:id', function (req, res, next) {
  Bin.findById(req.params.id, function (err, bin) {
    if (!err) {
      bin.addVersion(req.body, function (err){
        if (!err) {
          res.send(bin);
        }
        next();
      });
    }
  });
});

// Get a specific version of a bin
app.get(':/id/:version', function (req, res, next) {
  Bin.findById(req.params.id, function (err, bin) {
    if (!err) {
      bin.versions = bin.versions.filter(function (ver) {
        return ver.version === req.params.version;
      });
      res.send(bin);
    }
    next();
  });
});


app.listen(config.server.port, function (err) {
  if (!err) {
    return console.log('Server listening to ', config.server.port);
  }
  console.error('Error launching server');
  console.error(err);
});