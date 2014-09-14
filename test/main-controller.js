var request = require('request');
var expect = require('expect.js');
var root = 'http://localhost:3000';

describe('Main Controller', function () {
  describe('/', function () {
    describe('POST', function () {
      it('should make a new bin', function (done) {
        request.post(root + '/', function (err, bin) {
          expect(err).to.be(null);
          done();
        });
      });
    });
  });

  xdescribe('/:id', function () {
    describe('PUT', function () {
      var theBin = null;
      beforeEach(function (done) {
        request.post(root + '/', function (err, bin){
          theBin = bin;
          done();
        });
      });
      it('should update an existing bin', function (done) {
        request.put(root + '/' + theBin._id, function(err, bin) {
          expect(err).to.be(null);
          done();
        });
      });
    });
  });
});
