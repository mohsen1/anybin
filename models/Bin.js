'use strict';

var shortId = require('shortid');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BinSchema = new Schema({
  _id: {
    type: String,
    unique: true,
    default: shortId.generate
  },
  versions: [{
    body: {
      type: String,
      default: '',
      trim: false
    },
    created_at: {
      type : Date,
      default: Date.now
    },
    version: {
      type: Number,
      default: 1
    }
  }]
});

BinSchema.methods = {
  addVersion: function(body, cb) {
    var lastVersion = this.versions.length ? this.getLatest().version : 0;
    this.versions.push({
      body: body,
      version: lastVersion + 1
    })
    this.save(cb);
  },

  getLatest: function(){
    return this.versions[this.versions.length - 1];
  }
}


BinSchema.statics = {
  create: function (body, cb) {
    var bin = new this();
    bin.addVersion(body);
    bin.save(function (err){
      cb(err, bin);
    });
  }
};
mongoose.model('Bin', BinSchema);