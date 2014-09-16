var mongoose = require('mongoose');
var Bin = mongoose.model('Bin');

// Make a new Bin
exports.create = function (req, res, next) {
  Bin.create(req.body, function (err, bin){
    if (!err) { res.send(bin); }
    next();
  });
};

// Get latest version
exports.latest = function (req, res, next) {
  Bin.findById(req.params.id, function (err, bin) {
    if (!err) {
      bin.versions = bin.versions.splice(-1);
      res.send(bin);
    }
    next();
  });
};

// Update latest version
exports.update = function (req, res, next) {
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
};

// Add a new version
exports.updateVersion = function (req, res, next) {
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
};

// Get a specific version of a bin
exports.getVersion = function (req, res, next) {
  Bin.findById(req.params.id, function (err, bin) {
    if (!err) {
      bin.versions = bin.versions.filter(function (ver) {
        return ver.version === req.params.version;
      });
      res.send(bin);
    }
    next();
  });
};

