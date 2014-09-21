var mongoose = require('mongoose');
var request = require('request');
var Bin = mongoose.model('Bin');

// Render empty editor
exports.new = function(req, res, next) {
  if (req.query.import) {
    request.get(req.query.import, function (err, resp) {
      res.render('index.ejs', {body: resp.body});
    });
  } else {
    res.render('index.ejs', {body: ''});
  }
};

// Render editor with a bin
exports.show = function(req, res, next) {
  Bin.findById(req.params.id, function (err, result) {
    var body = '';
    var version = parseInt(req.params.version, 10);
    if (!err && result) {
      res.render('index.ejs', {body: result.toBin(version).body});
    } else {
      res.status(404).end();
    }
  });
};

