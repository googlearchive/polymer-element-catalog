var path = require('path');

var _ = require('lodash');

var stream = require('./utils/stream').obj;
var packageDetails = require('./utils/package-details');
var packageElements = require('./utils/package-elements');
var parseVersion = require('./utils/parse-version');

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

      package.version = details._release;
      package.description = details.description;
      package.elements = elements;

      console.log("===",package.name,"(" + details._release + ")");

      done(null, package);
    })
  );
};