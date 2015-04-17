var path = require('path');

var fs = require('graceful-fs');
var _ = require('lodash');
var gs = require('glob-stream');
var fm = require('front-matter');

var stream = require('./utils/stream').obj;

module.exports = function (guideFilePaths) {
  
  var output = stream.create();
  
  gs.create(guideFilePaths)
    .pipe(stream.get('path'))
    .pipe(getFileContents())
    .pipe(constructGuide())
    .pipe(output);
  
  return output;
};

function getFileContents () {
  
  return stream.asyncMap(function (filepath, enc, done) {
      
    fs.readFile(filepath, function (err, content) {
      
      done(err, {
        path: filepath,
        content: content.toString()
      });
    });
  });
}

function constructGuide () {
  
  return stream.concurrent(function (file, enc, done) {
        
    var rawGuide = fm(file.content);
    var packageName = getPackageName(file.path);
    var guide = _(rawGuide.attributes)
      .omit('updated', 'summary')
      .extend({
        name: path.join(packageName, getGuideName(file.path)),
        package: packageName
      })
      .value();
      
    done(null, guide);
  });
}

function getPackageName (filepath) {
  
  var segments = filepath.split('/');
  return segments[segments.length - 3];
}

function getGuideName (filepath) {
  
  var segments = filepath.split('/');
  return _.last(segments).split('.')[0];
}