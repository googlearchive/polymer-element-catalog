#!/usr/bin/env node

var through = require('through2');

var packages = require('./packages');
var objectFromStreams = require('./utils/object-from-streams');

module.exports = objectFromStreams({
  packages: packages(),
  elements: {},
  tags: {}
})

// TEMP: For output view
.pipe(through.obj(function (chunk, enc, done) {
  
  // console.log('here');
  console.log(chunk);
  
  done();
}));
 
 