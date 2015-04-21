var path = require('path');

module.exports = function (imports) {
  
  var root = imports.root;
  var name = imports.name;
  
  var packageBowerFilepath = path.resolve(root, 'bower_components/' + name + '/.bower.json');
  return require(packageBowerFilepath);
};