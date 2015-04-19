var path = require('path');

var _ = require('lodash');

var stream = require('./utils/stream').obj;
var packageDetails = require('./utils/package-details');
var packageElements = require('./utils/package-elements');

module.exports = function () {

  var bowerFile = require(path.resolve(__dirname, '../../bower.json'));
  var bowerDeps = bowerFile.dependencies;

  return stream.compose(
    stream.parse('packages.*'),
    stream.filter(function (package) {

      return bowerDeps[package.name];
    }),
    stream.asyncMap(function (package, done) {

      var details = packageDetails(package.name);
      var elements = packageElements(package.name, details.dependencies);

      // Using dummy data now until we have the actual elements
      done(null, {
        'tag-name': ['iron-custom', 'iron-another'],
        'another-tag': ['paper-custom', 'iron-custom']
      });
    })
  );
};