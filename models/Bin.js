var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BinSchema = new Schema({
  created_at: Date,
  short_id: String,
  forks: [{
    forked_at: Date,
    bin: 'Bin'
  }],
  forked_from: 'Bin',
  forked_at: Date,
  version: Number,
  body_history: [String]
});

module.exports = mongoose.Model('Bin', BinSchema);