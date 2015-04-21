#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

var _ = require('lodash');

var packages = require('./packages');
var elements = require('./elements');
var tags = require('./tags');
var guides = require('./guides');
var objectFromStreams = require('./utils/object-from-streams');

module.exports = function (srcFilepath) {
  
  var root = path.resolve(__dirname, '../../');
  var srcCatalog = fs.createReadStream(srcFilepath);
  var guideFilepaths = [
    path.resolve(process.cwd(), 'guides', '**.md'),
    path.resolve(process.cwd(), 'bower_components', '**', 'guides', '**.md')
  ];
  
  var elementsStream = srcCatalog.pipe(elements({root: root}));
  var guidesStream = guides(guideFilepaths);
  
  return objectFromStreams({
    packages: srcCatalog.pipe(packages({
      root: root,
      guides: guidesStream
    })),
    elements: elementsStream,
    tags: {
      data: elementsStream.pipe(tags()),
      onArray: _.first
    },
    guides: guidesStream
  });
};