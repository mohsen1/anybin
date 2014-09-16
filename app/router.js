var api = require('./controllers/api');
var main = require('./controllers/main');

module.exports = function (app) {

  // API endpoints
  app.post('/api/', api.create); // Make a new Bin
  app.get('/api/:id', api.latest); // Get latest version
  app.put('/api/:id', api.updateLastVersion); // Update latest version of a bin
  app.post('/api/:id', api.addVersion); // Add a new version to a bin
  app.get('/api/:id/:version', api.getVersion); // Get a specific version of a bin

  // Main endpoints
  app.get('/', main.new); // Empty editor
  app.get('/:id', main.show); // Editor loaded with a bin
  app.get('/:id/:version', main.show); // Editor loaded with an specific version of a bin
};