var path = require('path');

var fs = require('graceful-fs');
var _ = require('lodash');
var gs = require('glob-stream');
var fm = require('front-matter');
var marked = require('marked');

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
    
    // TODO: parse markdown here and write guide files
    // var guideAsHtml = marked(rawGuide.body);
    // var guideFilepath = path.join(
    //   process.cwd(),
    //   'dist',
    //   'data',
    //   file.path.replace(process.cwd(), '')
    // );
    // var parsedGuideFilepath = path.parse(guideFilepath);
    // var htmlGuideFilepath = path.join(parsedGuideFilepath.dir, parsedGuideFilepath.name + '.html');
    
    formatParsedGuideFilepath(file.path);
    
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

function formatParsedGuideFilepath (srcPath) {
  
  // TODO: convert
  //    maybe use these? -- packageName, getGuideName(file.path)
  // /bower_components/paper-elements/guides/test.md
  //    --> /dist/data/guides/paper-elements/test.html
  
  var relativeSrcPath = srcPath
    .replace(process.cwd() + path.sep, '')
    .split('/')
    .filter(function (segment) {
      
      return segment !== 'bower_components';
    })
    .join('/');
  
  console.log(relativeSrcPath)
  
  var guideFilepath = path.join(
    process.cwd(),
    'dist',
    'data',
    srcPath.replace(process.cwd(), '')
  );
  var parsedGuideFilepath = path.parse(guideFilepath);
  
  return path.join(parsedGuideFilepath.dir, parsedGuideFilepath.name + '.html');
}