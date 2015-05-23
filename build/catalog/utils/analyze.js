var path = require('path');
var fs = require('fs-extra');
var hydrolysis = require('hydrolysis');
var FileLoader = require('hydrolysis/lib/loader/file-loader');
var FSResolver = require('hydrolysis/lib/loader/fs-resolver');

module.exports = function(root, destDir, elementName, callback) {
  var elPath = path.join(root, 'bower_components', elementName, elementName + '.html');
  var loader = new FileLoader();

  if (fs.existsSync(elPath)) {
    hydrolysis.Analyzer.analyze(elPath, {clean: true}).then(function(data) {
      var out = {
        elements: data.elements || [],
        elementsByTagName: data.elementsByTagName,
        behaviors: data.behaviors || [],
        features: data.features || []
      }
      fs.writeFileSync(path.join(root, destDir, 'data', 'docs', elementName + '.json'), JSON.stringify(out));

      callback(null, data);
    }, function(err) {
      callback(err);
    });
  } else {
    console.log('! no package-named .html file found for ' + elementName);
    callback(null, null);
  }
}