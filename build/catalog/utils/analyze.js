var path = require('path');
var fs = require('fs-extra');
var hydrolysis = require('hydrolysis');
var FileLoader = require('hydrolysis/lib/loader/file-loader');
var FSResolver = require('hydrolysis/lib/loader/fs-resolver');

module.exports = function(root, elementName, callback) {
  var elPath = path.join(root, 'bower_components', elementName, elementName + '.html');
  var loader = new FileLoader();

  hydrolysis.Analyzer.analyze(elPath, {clean: true}).then(function(data) {
    var output = data.elements.map(function(el) {
      console.log('+ writing docs for', el.is, 'to data directory');
      fs.writeFileSync(path.join(root, '.tmp', 'data', 'elements', el.is + '.json'), JSON.stringify(el));
      return el;
    });
    
    callback(null, output);
  }, function(err) {
    callback(err);
  });
}