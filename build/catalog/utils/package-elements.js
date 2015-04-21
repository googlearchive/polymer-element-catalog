var _ = require('lodash');

module.exports = function (imports) {
  
  var name = imports.name;
  var deps = imports.deps;
  
  deps = deps || {};
  
  var prefix = name.split('-');
  
  // No prefix, no tags
  if (prefix.length < 2) {
    return [];
  }
  
  return _(deps)
    .keys()
    .filter(function (dep) {
    
      var depPrefix = dep.split('-');
      return depPrefix.length === 2 && depPrefix[0] === prefix[0];
    })
    .value();
}