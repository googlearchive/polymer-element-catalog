var path = require('path');

var _ = require('lodash');

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
  
  var data = [];
  var out = {};
  
  return stream.compose.obj(
    stream.parse('packages.*'),
    stream.filter.obj(function (package) {
      
      return bowerDeps[package.name];
    }),
    stream.asyncMap.obj(function (package, done) {
      
      var details = packageDetails(package.name);
      var elements = packageElements(package.name, details.dependencies);
      
      var output = _.map(elements, function (elementName) {
        
        // Set up object schema
        return {
          name: elementName,
          package: details.name,
          description: 'TOOD: update this to read from ' + elementName + '\'s bower.json description',
          tags: ['TODO', 'use', 'from', elementName, 'bower.json']
        };
      });
      
      done(null, output);
    }),
    
    // Conver to objects from arrays (and flatten)
    stream.create.obj(
      function (chunk, enc, done) {
        
        data.push(chunk);
        done();
      },
      function (done) {
        
        data = _(data)
          .flatten()
          .map(function (d) {
            
            return [d.name, d];
          })
          .zipObject()
          .value();
          
        
        this.push(data);
        done();
      }
    )
  );
}