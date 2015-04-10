var _ = require('lodash');

module.exports = function (name, deps) {
  
  deps = deps || {};
  var prefix = name.split('-');
  
  // No prefix, no tags
  if (prefix.length < 2) {
    return [];
  }
  
  return _(deps)
    .map(function (depVersion, depName) {
      
      return [depName, depVersion];
    })
    .filter(function (dep) {
    
    var depPrefix = dep[0].split('-');
    
    return depPrefix.length === 2 && depPrefix[0] === prefix[0];
  })
  .zipObject()
  .keys()
  .value();
}