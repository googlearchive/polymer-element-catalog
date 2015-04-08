var _ = require('lodash');
var asyncEach = require('async-each');
var through = require('through2');
var isStream = require('is-stream');
var fns = require('./functional-streams');

module.exports = function (spec) {
  
  var objectStream = through.obj();
  
  asyncEach(Object.keys(spec), function (key, done) {
    
    if (isStream(spec[key])) {
      spec[key].pipe(fns.concat(function (data) {
        
        var obj = {};
        obj[key] = data;
        objectStream.push(obj);
        
        done();
      }));
    }
    else {
      var obj = {};
      obj[key] = spec[key];
      objectStream.push(obj);
      done();
    }
  }, function () {
    
    objectStream.end();
  });
  
  // TODO: right now this returns a stream containing the whole object.
  // It might be could to split it by key?
  return objectStream
    .pipe(fns.reduce.obj(_.extend));
};