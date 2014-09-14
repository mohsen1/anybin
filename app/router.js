var main = require('./controllers/main');

module.exports = function (app) {

  app.get('/', main.index);
  app.post('/', main.create);
  app.get('/:id', main.latest);
  app.put('/:id', main.update);
  app.post('/:id', updateVersion);
  app.get(':/id/:version', main.getVersion);

};