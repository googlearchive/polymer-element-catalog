var fs = require('fs');
var path = require('path');

var _ = require('lodash');
var glob = require('globby');
var fm = require('front-matter');

var stream = require('./utils/stream').obj;
var packageDetails = require('./utils/package-details');
var packageElements = require('./utils/package-elements');

module.exports = function (guidFilePaths) {
  
  var output = stream.create();
  var filepaths = glob.sync(guidFilePaths);
  
  stream.from(filepaths)
    .pipe(stream.concurrent(function (filepath, enc, done) {
      
      fs.readFile(filepath, function (err, content) {
        
        var rawGuide = fm(content.toString());
        var packageName = getPackageName(filepath);
        var guide = _(rawGuide.attributes)
          .omit('updated', 'summary')
          .extend({
            name: path.join(packageName, getGuideName(filepath)),
            package: packageName
          })
          .value();
          
        done(null, guide);
      });
    }))
    .pipe(output);
  
  
  return output;
};

function getPackageName (filepath) {
  
  var segments = filepath.split('/');
  return segments[segments.length - 3];
}

function getGuideName (filepath) {
  
  var segments = filepath.split('/');
  return _.last(segments).split('.')[0];
}