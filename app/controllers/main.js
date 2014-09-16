var mongoose = require('mongoose');
var Bin = mongoose.model('Bin');

// Render empty editor
exports.new = function(req, res, next) {
  res.render('bin.ejs', {body: ''});
};

// Render editor with a bin
exports.show = function(req, res, next) {
  Bin.findById(req.params.id, function (err, result) {
    var body = '';
    if (!err && result) {
      res.render('bin.ejs', {body: result.toBin().body});
    } else {
      res.status(404).end();
    }
  });
};

