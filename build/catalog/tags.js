var path = require('path');

var _ = require('lodash');

var stream = require('./utils/stream').obj;
var packageDetails = require('./utils/package-details');
var packageElements = require('./utils/package-elements');

module.exports = function (imports) {

  return stream.map(function (element) {
      
    var tags = element.tags;
    
    // TODO: parse tags from elements. None of them
    // have any tags yet
    
    return {};
  });
};