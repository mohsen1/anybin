'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VersionSchema = new Schema({
  bin_uuid: String,
  body: String,
  created_at: Date,
  version: Number
});

mongoose.Model('Version', VersionSchema);