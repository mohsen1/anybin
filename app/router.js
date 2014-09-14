var main = require('./controllers/main');

module.exports = function (app) {

  app.get('/', main.index); // List all bins
  app.post('/', main.create); // Make a new Bin
  app.get('/:id', main.latest); // Get latest version
  app.put('/:id', main.update); // Update latest version of a bin
  app.post('/:id', main.updateVersion); // Add a new version to a bin
  app.get(':/id/:version', main.getVersion); // Get a specific version of a bin

};