var _ = require('lodash');

var stream = require('./utils/stream').obj;
var packageDetails = require('./utils/package-details');
var packageElements = require('./utils/package-elements');
var parseVersion = require('./utils/parse-version');

module.exports = function (imports) {
  
  var root = imports.root;
  var bowerFile = require(root + '/bower.json');
  var deps = bowerFile.dependencies;
  
  return stream.compose(
    stream.parse('packages.*'),
    stream.filter(function (package) {
      
      return deps[package.name];
    }),
    stream.asyncMap(function (package, done) {
      
      var details = packageDetails({
        root: root,
        name: package.name
      });
      
      var elements = packageElements({
        name: package.name,
        deps: details.dependencies
      });

      package.version = details._release;
      package.description = details.description;
      package.elements = elements;
      
      // TODO: add this when parsing real packages gets solved
      // package.guides = []; 

      console.log("===",package.name,"(" + details._release + ")");

      done(null, package);
    })
  );
};