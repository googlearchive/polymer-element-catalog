#!/usr/bin/env node

var fs = require('fs');

var stream = require('./utils/stream');
var packages = require('./packages');
var objectFromStreams = require('./utils/object-from-streams');

var exports = module.exports = function (srcFilepath) {
  
  return objectFromStreams({
    packages: fs.createReadStream(srcFilepath).pipe(packages()),
    elements: {},
    tags: {}
  });
};

exports.stream = stream;