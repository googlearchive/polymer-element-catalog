var path = require('path');

var _ = require('lodash');

var stream = require('./utils/stream').obj;
var packageDetails = require('./utils/package-details');
var packageElements = require('./utils/package-elements');

module.exports = function () {

  var bowerFile = require(path.resolve(__dirname, '../../bower.json'));
  var bowerDeps = bowerFile.dependencies;

  var data = [];
  var out = {};

  return stream.compose(
    stream.parse('packages.*'),
    stream.filter(function (package) {
      return bowerDeps[package.name];
    }),
    stream.asyncMap(function (package, done) {
      var packageBower = packageDetails(package.name);
      var elements = packageElements(package.name, packageBower.dependencies);

      var output = _.map(elements, function (elementName) {
        var details = packageDetails(elementName);
        // Set up object schema
        console.log("-",elementName,"(" + details._release + ")");
        return {
          name: elementName,
          version: details._release,
          package: package.name,
          description: details.description,
          tags: details.keywords
        };
      });

      done(null, output);
    }),

    // Conver to objects from arrays (and flatten)
    stream.create(
      function (chunk, enc, done) {

        data.push(chunk);
        done();
      },
      function (done) {

        var sortedData = _(data)
          .flatten()
          .sortBy('name')
          .value();

        this.push(sortedData);
        done();
      }
    )
  );
}