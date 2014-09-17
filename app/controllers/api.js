var mongoose = require('mongoose');
var request = require('request');
var Bin = mongoose.model('Bin');

// Make a new Bin
exports.create = function (req, res, next) {
  if (req.query.import) {
    request.get(req.query.import, function (err, resp) {
      if (err) {
        res.status(500, err).end();
      } else {
        Bin.create(resp.body, createCb);
      }
    });
  } else {
    Bin.create(req.body, createCb);
  }
  function createCb(err, result){
    if (!err) {
      res.cookie(result.getSecret(), true, {
        maxAge: 900000, httpOnly: true
      });
      res.send(result.toBin());
    } else {
      res.status(500, err).end();
    }
    next();
  }
};

// Get latest version
exports.latest = function (req, res, next) {
  Bin.findById(req.params.id, function (err, result) {
    if (!err) {
      res.send(result.toBin());
    }
    next();
  });
};

// Update latest version of a bin
exports.updateLastVersion = function (req, res, next) {
  Bin.findById(req.params.id, function (err, result) {
    if (!err && result) {
      // If they have the cookie
      if (req.cookies[result.getSecret()]) {
        result.updateLastVersion(req.body, function (err){
          if (!err) {
            res.send(result.toBin());
          }
          next();
        });
      } else {
        exports.create(req, res, next);
      }
    }
  });
};

// Add a new version
exports.addVersion = function (req, res, next) {
  Bin.findById(req.params.id, function (err, result) {
    if (!err && result) {

      // If they have the secret cookie, create a new version on top
      if (req.cookies[result.getSecret()]) {
        result.addVersion(req.body, function (err){
          if (!err) {
            res.send(result.toBin());
          }
          next();
        });

      // if they don't have the secret cookie, make a new bin
      } else {
        exports.create(req, res, next);
      }
    } else {
      res.status(500, err).end();
    }
  });
};

// Get a specific version of a bin
exports.getVersion = function (req, res, next) {
  Bin.findById(req.params.id, function (err, result) {
    if (!err) {
      res.send(result.toBin(+req.params.version));
    }
    next();
  });
};