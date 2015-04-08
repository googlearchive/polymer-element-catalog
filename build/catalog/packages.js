var path = require('path');

var _ = require('lodash');
var fs = require('fs-extra');
var asyncMap = require('through2-asyncmap');
var filter = require('through2-filter');
var jsonStream = require('JSONStream');

var packageDetails = require('./utils/package-details');
var packageElements = require('./utils/package-elements');

var catalogFileStream = fs.createReadStream(path.resolve(__dirname, '../../catalog.json'));
var bowerFile = require(path.resolve(__dirname, '../../bower.json'));

// TODO: uncomment this to work with real data
// var bowerDeps = bowerFile.dependencies;
// 
// TEMP: mock data
var bowerDeps = _.extend(bowerFile.dependencies, {
  'core-elements': '1.0.0',
  'paper-elements': '1.1.4'
});

module.exports = function () {
 
 return catalogFileStream
   .pipe(jsonStream.parse('packages.*'))
   .pipe(filter.obj(function (package) {
     
     return bowerDeps[package.name];
   }))
   .pipe(asyncMap.obj(function (package, done) {
     
     var details = packageDetails(package.name);
     var elements = packageElements(package.name, details.dependencies);
     
     package.version = bowerDeps[package.name];
     package.description = details.description;
     package.elements = elements;
     
     done(null, package);
   })); 
};