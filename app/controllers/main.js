// Render empty editor
exports.new = function(req, res, next) {
  res.render('bin.ejs', {body: 'TODO'});
  next();
};

// Render editor with a bin
exports.show = function(req, res, next) {
  res.render('bin.ejs', {body: 'TODO'});
  next();
};

