var _ = require('lodash');
var asyncEach = require('async-each');

var stream = require('./stream').obj;

module.exports = function (spec) {
  
  var objectStream = stream.create();
  
  
  asyncEach(Object.keys(spec), function (key, done) {
    
    if (stream.validate(spec[key])) {
      spec[key].pipe(stream.concat(function (data) {
        
        var obj = {};
        obj[key] = data;
        objectStream.push(obj);
        
        done();
      }));
    }
    
    else if (typeof spec[key] === 'object' && spec[key].onArray && stream.validate(spec[key].data)) {
      
      spec[key].data.pipe(stream.concat(function (data) {
        
        var obj = {};
        obj[key] = spec[key].onArray(data);
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
    .pipe(stream.reduce(_.extend));
};