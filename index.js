'use strict';

var express = require('express');

var app = express();

app.get('/', function (req, res, next) {
  res.send('Bin!');
  next();
});


app.listen(3000);