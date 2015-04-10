var concat = require('concat-stream');
var reduce = require('through2-reduce');
var asyncMap = require('through2-asyncmap');
var filter = require('through2-filter');
var through = require('through2');
var jsonStream = require('JSONStream');
var isStream = require('is-stream');
var split = require('split');
var writeStreamP = require('writestreamp');
var pumpify = require('pumpify');

exports.create = through;
exports.split = split;
exports.writeFile = writeStreamP;

exports.parse = jsonStream.parse.bind(jsonStream);
exports.stringify = jsonStream.stringify.bind(jsonStream);
exports.stringify.obj = jsonStream.stringifyObject = function (options) {
  
  options = options || {};
  
  return through.obj(function (chunk, enc, done) {
    
    done(null, JSON.stringify(chunk, null, options.space));
  });
}
exports.validate = isStream;

exports.concat = concat;
exports.compose = pumpify;

reduce.obj = function (fn) {
  
  return reduce.call(null, {objectMode: true}, fn);
}

exports.reduce = reduce;
exports.filter = filter;
exports.asyncMap = asyncMap;

// Object mode
exports.obj = {
  create: exports.create.obj,
  split: exports.split.obj,
  writeFile: exports.writeFile,
  
  parse: exports.parse,
  stringify: exports.stringify.obj,
  validate: exports.validate,
  
  concat: exports.concat,
  compose: exports.compose.obj,
  
  reduce: exports.reduce.obj,
  filter: exports.filter.obj,
  asyncMap: exports.asyncMap.obj
};
