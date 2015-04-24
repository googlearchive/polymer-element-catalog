var concat = require('concat-stream');
var reduce = require('through2-reduce');
var asyncMap = require('through2-asyncmap');
var filter = require('through2-filter');
var map = require('through2-map');
var through = require('through2');
var jsonStream = require('JSONStream');
var isStream = require('is-stream');
var split = require('split');
var writeStreamP = require('writestreamp');
var pumpify = require('pumpify');
var from = require('from2');
var concurrent = require('through2-concurrent');
var eos = require('end-of-stream');

exports.create = through;
exports.split = split;
exports.writeFile = writeStreamP;
exports.from = from;
exports.concurrent = concurrent;
exports.onEnd = eos;

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

exports.reduce = reduce;
reduce.obj = function (fn) {
  
  return reduce.call(null, {objectMode: true}, fn);
}
exports.filter = filter;
exports.map = map;
exports.asyncMap = asyncMap;

// Object mode
exports.obj = {
  create: exports.create.obj,
  split: exports.split.obj,
  writeFile: exports.writeFile,
  from: from.obj,
  concurrent: exports.concurrent.obj,
  onEnd: exports.onEnd,
  
  parse: exports.parse,
  stringify: exports.stringify.obj,
  validate: exports.validate,
  
  concat: exports.concat,
  compose: exports.compose.obj,
  
  reduce: exports.reduce.obj,
  filter: exports.filter.obj,
  map: exports.map.obj,
  asyncMap: exports.asyncMap.obj,
  get: function (key) {
    
    return exports.obj.create(function (obj, enc, done) {
      
      done(null, obj[key]);
    });
  }
};
