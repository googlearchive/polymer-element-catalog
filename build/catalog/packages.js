var path = require('path');

var _ = require('lodash');
var jsonStream = require('JSONStream');
var pumpify = require('pumpify');

var stream = require('./utils/stream');
var packageDetails = require('./utils/package-details');
var packageElements = require('./utils/package-elements');

module.exports = function () {
  
  var bowerFile = require(path.resolve(__dirname, '../../bower.json'));
  
  // TODO: uncomment this to work with real data
  // var bowerDeps = bowerFile.dependencies;
  // 
  // TEMP: mock data
  var bowerDeps = _.extend(bowerFile.dependencies, {
    'core-elements': '1.0.0',
    'paper-elements': '1.1.4'
  });
 
  return pumpify.obj(
    stream.parse('packages.*'),
    stream.filter.obj(function (package) {
      
      return bowerDeps[package.name];
    }),
    stream.asyncMap.obj(function (package, done) {
      
      var details = packageDetails(package.name);
      var elements = packageElements(package.name, details.dependencies);
      
      package.version = bowerDeps[package.name];
      package.description = details.description;
      package.elements = elements;
      
      done(null, package);
    })
  ); 
};