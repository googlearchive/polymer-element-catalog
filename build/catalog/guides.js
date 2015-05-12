var path = require('path');

var fs = require('graceful-fs');
var _ = require('lodash');
var gs = require('glob-stream');
var fm = require('front-matter');
var mkdirp = require('mkdirp');

var stream = require('./utils/stream').obj;
var render = require('./utils/render-guide');

module.exports = function (options) {

  var guideFilePaths = options.src;
  var destDir = options.destDir;
  var output = stream.create();

  gs.create(guideFilePaths)
    .pipe(stream.get('path'))
    .pipe(getFileContents())
    .pipe(constructGuide(destDir))
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

function constructGuide (destDir) {

  return stream.concurrent(function (file, enc, done) {

    var rawGuide = fm(file.content);
    var packageName = getPackageName(file.path);
    var guideName = getGuideName(file.path);
    if (packageName) guideName = path.join(packageName, guideName);

    var guide = _(rawGuide.attributes)
      //.omit('updated', 'summary')
      .extend({
        name: guideName,
        package: packageName
      })
      .value();

    // Convert markdown guides to HTML
    writeGuidesFile({
      src: file.path,
      dest: destDir,
      body: rawGuide.body
    }, function (err) {

      done(err, guide)
    });
  });
}

function writeGuidesFile (options, done) {

  var src = options.src;
  var body = options.body;
  var destDir = options.dest;

  var guideDestPath = formatParsedGuideFilepath(src, destDir);
  var dir = path.dirname(guideDestPath);

  mkdirp(dir, function (err) {

    if (err) {
      return done(err);
    }

    fs.writeFile(guideDestPath, render(body), done);
  });
}

function getPackageName (filepath) {

  var segments = filepath.split('/');
  if (segments.indexOf('bower_components') >= 0) {
    return segments[segments.length - 3];
  }
}

function getGuideName (filepath) {

  var segments = filepath.split('/');
  return _.last(segments).split('.')[0];
}

function formatParsedGuideFilepath (srcPath, destDir) {

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
    destDir,
    'data',
    relativeSrcPath,
    filename
  );
}