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
  secret: {
    type: String,
    default: randomStr
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

  updateLastVersion: function(body, cb) {
    this.versions[this.versions.length - 1].body = body;
    this.save(cb);
  },

  getLatest: function(){
    if (this.versions){
      return this.versions[this.versions.length - 1];
    }
  },

  getSecret: function(){
    return this.secret;
  },

  toBin: function (versionNumber) {
    var bin = {};
    var obj = this.toObject();
    versionNumber = versionNumber || obj.versions.length;
    var version = obj.versions[versionNumber - 1];

    bin.id = obj._id;
    if (version) {
      bin.version = version.version;
      bin.body = version.body;
      bin.created_at = version.created_at;
    }

    return bin;
  }
}


BinSchema.statics = {
  create: function (body, cb) {
    var bin = new this();
    bin.addVersion(body);
    bin.save(function (err){
      cb(err, bin);
    });
  },

  findById: function (id, cb) {
    this.findOne({_id: id}, function (err, bin) {
      if (err) { return cb(err); }
      cb(err, bin);
    });
  }
};

if (!BinSchema.options.toObject) BinSchema.options.toObject = {};
BinSchema.options.toObject.transform = function (doc, ret, options) {
  delete ret.__v;
  delete ret.secret;
  if (ret.versions && ret.versions.length) {
    ret.versions.forEach(function (ver) {
      delete ver._id;
    });
  }
};

mongoose.model('Bin', BinSchema);


function randomStr(){
  return (Date.now() * Math.random()).toString(36).replace('.', '');
}