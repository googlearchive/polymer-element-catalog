var path = require('path');

var _ = require('lodash');

var stream = require('./utils/stream').obj;
var packageDetails = require('./utils/package-details');
var packageElements = require('./utils/package-elements');

module.exports = function (imports) {

  var root = imports.root;
  var bowerFile = require(root + '/bower.json');
  var deps = bowerFile.dependencies;

  var data = [];
  var out = {};

  return stream.compose(
    stream.parse('packages.*'),
    stream.filter(function (package) {
      
      return deps[package.name];
    }),
    stream.asyncMap(function (package, done) {
      
      var packageBower = packageDetails({
        root: root,
        name: package.name
      });
      
      var elements = packageElements({
        name: package.name,
        deps: packageBower.dependencies
      });

      var output = _.map(elements, function (elementName) {
        
        var details = packageDetails({
          root: root,
          name: elementName
        });
        
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

    // Convert to objects from arrays (and flatten)
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