var concat = require('concat-stream');
var reduce = require('through2-reduce');
var asyncMap = require('through2-asyncmap');
var filter = require('through2-filter');

reduce.obj = function (fn) {
  
  return reduce.call(null, {objectMode: true}, fn);
}

exports.reduce = reduce;
exports.filter = filter;
exports.asyncMap = asyncMap;
exports.concat = concat;
