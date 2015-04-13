#!/usr/bin/env node

var fs = require('fs');

var _ = require('lodash');

var packages = require('./packages');
var elements = require('./elements');
var tags = require('./tags');
var objectFromStreams = require('./utils/object-from-streams');

var exports = module.exports = function (srcFilepath) {
  
  var srcCatalog = fs.createReadStream(srcFilepath);
  
  return objectFromStreams({
    packages: srcCatalog.pipe(packages()),
    elements: srcCatalog.pipe(elements()),
    tags: {
      data: srcCatalog.pipe(tags()),
      onArray: _.first
    }
  });
};