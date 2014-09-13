'use strict';

var shortId = require('shortid');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BinSchema = new Schema({
  _id: {
    type: String,
    unique: true,
    'default': shortId.generate
  }//,
  // versions: {
  //   type: Array,
  //   default: [],
  //   items: {
  //     type: 'Version'
  //   }
  // }
});

mongoose.model('Bin', BinSchema, {});