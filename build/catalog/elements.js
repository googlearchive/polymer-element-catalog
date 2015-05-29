var path = require('path');
var fs = require('fs-extra');

var _ = require('lodash');
var async = require('async');

var stream = require('./utils/stream').obj;
var packageDetails = require('./utils/package-details');
var packageElements = require('./utils/package-elements');
var analyze = require('./utils/analyze');
var cleanTags = require('./utils/clean-tags');

module.exports = function (imports) {

  var root = imports.root;
  var destDir = imports.destDir;
  var bowerFile = require(root + '/bower.json');
  var deps = bowerFile.dependencies;

  var data = [];
  var out = {};

  return stream.compose(
    stream.parse('packages.*'),
    stream.filter(function(package) {

      return deps[package.name];
    }),
    stream.asyncMap(function (package, done) {

      var packageBower = packageDetails({
        root: root,
        name: package.name
      });

      var elements = packageElements({
        name: package.name,
        deps: packageBower.dependencies
      });

      var output = async.map(elements, function (elementName, cb) {

        var details = packageDetails({
          root: root,
          name: elementName
        });

        fs.mkdirsSync(path.join(root, destDir, 'data', 'docs'));
        if (typeof details.main === 'string') details.main = [details.main];
        analyze(root, destDir, elementName, details.main || [elementName + '.html'], function(err, data) {
          // Set up object schema
          console.log("-",elementName,"(" + details._release + ")");

          var combined = data.elements.concat(data.behaviors);
          var hero;
          combined.forEach(function(el) {
            if (el.hero) hero = '/bower_components/' + elementName + '/' + el.hero;
          });

          var active = null;
          var demo = null;
          for (var i in combined) {
            if (combined[i].demos.length) {
              active = combined[i].is;
              demo = (combined[i].demos || [])[0] || null;
            }
          }

          cb(err, {
            name: elementName,
            version: details._release,
            source: details._originalSource,
            target: details._target,
            package: package.name,
            description: details.description,
            tags: (details.keywords || []).filter(cleanTags),
            hero: hero,
            demo: demo,
            active: active,
            elements: (data.elements || []).map(function(el){ return el.is; }),
            behaviors: (data.behaviors || []).map(function(be){ return be.is; }),
          });
        });
      }, function(err, output) {
        done(err, output);
      });
    }),

    // Convert to objects from arrays (and flatten),
    // and sort
    stream.create(
      function (chunk, enc, done) {

        data.push(chunk);
        done();
      },
      function (done) {

        var sortedData = _(data)
          .flatten()
          .sortBy('name')
          .value();

        this.push(sortedData);
        done();
      }
    )
  );
}