var path = require('path');

var fs = require('graceful-fs');
var _ = require('lodash');
var gs = require('glob-stream');
var fm = require('front-matter');
var marked = require('marked');
var mkdirp = require('mkdirp');

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
    
    // Convert markdown guides to HTML
    var guideDestPath = formatParsedGuideFilepath(file.path);
    var dir = path.dirname(guideDestPath);
    
    mkdirp(dir, function (err) {
      
      if (err) {
        return done(err);
      }
      
      fs.writeFile(guideDestPath, marked(rawGuide.body), function (err) {
        
        if (err) {
          return done(err);
        }
        
        done(null, guide);
      });
    });
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

function formatParsedGuideFilepath (srcPath, options) {
  
  var relativeSrcPath = srcPath
    .replace(process.cwd() + path.sep, '')
    .split('/')
    .filter(function (segment) {
      
      return segment !== 'bower_components';
    });
  
  // Elements in the bower_components directory
  // need to have the guides segment put before the
  // element name in the path
  if (relativeSrcPath[0] !== 'guides') {
    relativeSrcPath[1] = relativeSrcPath[0];
    relativeSrcPath[0] = 'guides';
  }
  
  var filename = _.last(relativeSrcPath).split('.')[0] + '.html';
  relativeSrcPath = path.dirname(relativeSrcPath.join('/'));
  
  return path.join(
    process.cwd(),
    'dist',
    'data',
    relativeSrcPath,
    filename
  );
}