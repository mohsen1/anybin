'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BinSchema = new Schema({
  uuid: String,
  versions: [ 'Version' ]
});

module.exports = mongoose.Model('Bin', BinSchema);