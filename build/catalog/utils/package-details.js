var path = require('path');

// TODO: need real data
// mocking the data right now
// until Google pushes elements live
//
module.exports = function (name) {
  var packageBowerFilepath = path.resolve(__dirname, '../../../bower_components/' + name + '/.bower.json');
  return require(packageBowerFilepath);
};