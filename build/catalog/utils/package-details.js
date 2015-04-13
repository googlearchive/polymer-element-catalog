var path = require('path');

// TODO: need real data
// mocking the data right now
// until Google pushes elements live
// 
module.exports = function (name) {
  
  var packageBowerFilepath = path.resolve(__dirname, '../bower_components/' + name + '/bower.json');
  
  return {
    name: name,
    description: 'This is the temporary element description',
    version: '0.1.0',
    dependencies: {
      'iron-custom': '0.2.0',
      'iron-another': '1.0.0',
      'paper-custom': '0.3.1'
    }
  };
};