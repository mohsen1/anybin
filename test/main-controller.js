var request = require('request');
var expect = require('expect.js');
var root = 'http://localhost:3000';

describe('Main Controller', function () {
  describe('/', function () {
    describe('POST', function () {
      it('should make a new bin', function (done) {
        request.post(root + '/', done);
      });
    });
  });
});
