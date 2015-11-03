'use strict';

var path = require('path');

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var gutil = require('gulp-util');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var pagespeed = require('psi');
var reload = browserSync.reload;
var merge = require('merge-stream');
var superstatic = require('superstatic');
var plumber = require('gulp-plumber');
var polybuild = require('./polybuild');
var inlinesource = require('gulp-inline-source');

var stream = require('./build/catalog/utils/stream').obj;
var catalogBuilder = require('./build/catalog');

function serve(directories, callback) {
  var port = process.env.PORT || 3000;
  var dev = connect();
  directories.forEach(function (directory) {
    dev.use(superstatic({ config: { root: directory } }));
  });
  dev.listen(port, function () {
    var url = 'http://localhost:' +  port;
    $.util.log('Local server started at: ', $.util.colors.cyan(url));
    if (typeof callback === 'function') {
      callback(null, url);
    }
  });
}

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

var CATALOG_FILEPATH = __dirname + '/catalog.json';

// Lint JavaScript
gulp.task('jshint', function () {
  return gulp.src([
      'app/scripts/**/*.js',
      'app/elements/**/*.js',
      'app/elements/**/*.html'
    ])
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint.extract()) // Extract JS from .html files
    .pipe($.jshint({esnext: true}))
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

// Optimize Images
gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size({title: 'images'}));
});

// Copy All Files At The Root Level (app)
gulp.task('copy', function () {
  var app = gulp.src([
    'app/*',
    '!app/test',
    'node_modules/apache-server-configs/dist/.htaccess'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));

  var bower = gulp.src([
    'bower_components/**/*'
  ]).pipe(gulp.dest('dist/bower_components'));

  var elements = gulp.src(['app/elements/**/*.html'])
    .pipe(gulp.dest('dist/elements'));

  if (process.env.FIXTURES) {
    gulp.src(['fixtures/**/*']).pipe(gulp.dest('dist'));
  }

  return merge(app, bower, elements).pipe($.size({title: 'copy'}));
});

// Copy Web Fonts To Dist
gulp.task('fonts', function () {
  return gulp.src(['app/fonts/**'])
    .pipe(gulp.dest('dist/fonts'))
    .pipe($.size({title: 'fonts'}));
});

// Compile and Automatically Prefix Stylesheets
gulp.task('styles', function () {
  return gulp.src([
      'app/styles/**/*.css'
    ])
    .pipe($.changed('styles', {extension: '.css'}))
    // .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(gulp.dest('dist/styles'))
    .pipe($.size({title: 'styles'}));
});

gulp.task('elements', function () {
  return gulp.src([
    'app/elements/**/*.css'
    ])
    .pipe($.changed('styles', {extension: '.css'}))
    .pipe(gulp.dest('.tmp/elements'))
    .pipe(gulp.dest('dist/elements'))
    .pipe($.size({title: 'elements'}));
});

// Scan Your HTML For Assets & Optimize Them
gulp.task('html', function () {
  var assets = $.useref.assets({searchPath: ['.tmp', 'app', 'dist']});

  return gulp.src(['app/**/*.html', '!app/{elements,test}/**/*.html'])
    .pipe(inlinesource())
    // Replace path for build assets
    .pipe($.if('*.html', $.replace('elements/elements.html', 'elements/elements.build.html')))
    .pipe(assets)
    // Concatenate And Minify JavaScript
    .pipe($.if('*.js', $.uglify({preserveComments: 'some'})))
    // Concatenate And Minify Styles
    // In case you are still using useref build blocks
    .pipe($.if('*.css', $.cssmin()))
    .pipe(assets.restore())
    .pipe($.useref())
    // Minify Any HTML
    .pipe($.if('*.html', $.minifyHtml({
      quotes: true,
      empty: true,
      spare: true
    })))
    // Output Files
    .pipe(gulp.dest('dist'))
    .pipe($.size({title: 'html'}));
});

// Polybuild imports
gulp.task('polybuild', function () {
  var DEST_DIR = 'dist/elements';

  return gulp.src('dist/elements/elements.html')
    .pipe(polybuild())
    .pipe(gulp.dest(DEST_DIR))
    .pipe($.size({title: 'polybuild'}));
});

// Clean Output Directory
gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

// Clean everything
gulp.task('distclean', ['clean'], del.bind(null, ['bower_components']));

// Watch Files For Changes & Reload
gulp.task('serve', ['styles', 'elements', 'catalog:dev'], function () {
  var dirs = ['.tmp','app'];
  var mw = [
    function(req, res, next) {
      if (req.url.indexOf('/bower_components') !== 0) return next();
      req.url = req.url.replace(/^\/bower_components/,'');
      return superstatic({config: {root: 'bower_components'}})(req,res,next);
    },
    superstatic({config: {root: '.tmp'}}),
    superstatic({config: {root: 'app'}})
  ]
  if (process.env.FIXTURES) mw.unshift(superstatic({config: {root: 'fixtures'}}));

  browserSync({
    notify: true,
    server: {
      baseDir: dirs,
      middleware: mw
    }
  });

  gulp.watch(['app/**/*.html'], reload);
  gulp.watch(['app/styles/**/*.css'], ['styles', reload]);
  gulp.watch(['app/elements/**/*.css'], ['elements', reload]);
  gulp.watch(['app/scripts/**/*.js'], ['jshint']);
  gulp.watch(['app/images/**/*'], reload);
});

// Build and serve the output from the dist build
gulp.task('serve:dist', ['default'], function () {
  browserSync({
    notify: false,
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: 'dist'
  });
});

// Build Production Files, the Default Task
gulp.task('default', ['clean'], function (cb) {
  runSequence(
    ['copy', 'styles'],
    'elements',
    ['jshint', 'images', 'fonts', 'html'],
    'catalog:dist',
    'polybuild',
    cb);
});

// Run PageSpeed Insights
// Update `url` below to the public URL for your site
gulp.task('pagespeed', function (cb) {
  // Update the below URL to the public URL of your site
  pagespeed.output('example.com', {
    strategy: 'mobile',
    // By default we use the PageSpeed Insights free (no API key) tier.
    // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
    // key: 'YOUR_API_KEY'
  }, cb);
});

gulp.task('catalog_assets:dist', function() {
  return gulp.src('guides/assets/**/*').pipe(gulp.dest('dist/guides/assets'));
});

// Build element catalog JSON file
gulp.task('catalog:dist', ['catalog_assets:dist'], function () {
  if (process.env.FIXTURES) return;

  return execCatalogTask({
    destDir: 'dist'
  });
});

gulp.task('catalog_assets:dev', function() {
  return gulp.src('guides/assets/**/*').pipe(gulp.dest('.tmp/guides/assets'));
});

gulp.task('catalog:dev', ['catalog_assets:dev'], function () {
  return execCatalogTask({
    destDir: '.tmp',
    space: 2
  });
});

function execCatalogTask (options) {
  var destDir = options.destDir;
  var space = options.space;
  var destFilepath = path.join('.', destDir, 'catalog.json');

  return catalogBuilder({
      src: CATALOG_FILEPATH,
      destDir: destDir
    })
    .pipe(stream.stringify({space: space}))
    .pipe(stream.writeFile(destFilepath));
}


// Load tasks for web-component-tester
// Adds tasks for `gulp test:local` and `gulp test:remote`
try { require('web-component-tester').gulp.init(gulp); } catch (err) {}

// Load custom tasks from the `tasks` directory
try { require('require-dir')('tasks'); } catch (err) {}
