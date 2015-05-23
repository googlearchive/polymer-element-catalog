var path = require('path');
var fs = require('fs');

module.exports = function (imports) {

  var root = imports.root;
  var name = imports.name;

  var packageBowerFilepath = path.resolve(root, 'bower_components/' + name + '/.bower.json');
  if (fs.existsSync(packageBowerFilepath)) {
    return require(packageBowerFilepath);
  } else {
    return {};
  }
};