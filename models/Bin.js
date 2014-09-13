'use strict';

var shortId = require('shortid');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

shortId.characters('abcdefghijklmnopqrstuvwxyz');

var binSchema = new Schema({
  _id: {
    type: String,
    unique: true,
    'default': shortId.generate
  },
  // versions: {
  //   type: Array,
  //   default: [],
  //   items: {
  //     type: 'Version'
  //   }
  // }
});

mongoose.Model('Bin', binSchema);