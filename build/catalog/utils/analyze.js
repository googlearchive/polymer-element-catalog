var path = require('path');
var fs = require('fs-extra');
var hydrolysis = require('hydrolysis');
var FileLoader = require('hydrolysis/lib/loader/file-loader');
var FSResolver = require('hydrolysis/lib/loader/fs-resolver');
var Promise = require('es6-promise').Promise;

module.exports = function(root, destDir, elementName, sources, callback) {
  var elRoot = path.join(root, 'bower_components', elementName);
  var elPath = path.join(elRoot, elementName + '.html');
  var sourcePaths = sources.map(function(source) {
    return (source.indexOf('/') >= 0) ? source : path.join(elRoot,source);
  });
  var loader = new FileLoader();

  Promise.all(sourcePaths.filter(function(path) {
    return fs.existsSync(path);
  }).map(function(path) {
    return hydrolysis.Analyzer.analyze(path, {clean: true});
  })).then(function(values) {
    var out = {elements: [], behaviors: [], features: [], elementsByTagName: {}};
    values.forEach(function(data) {
      var els = out.elements.map(function(el){ return el.is });
      var bes = out.behaviors.map(function(be){ return be.is });
      data.elements.forEach(function(element){
        element.scriptElement = undefined;
        element.behaviors && element.behaviors.forEach(function(behavior){
          behavior.javascriptNode = undefined;
        });
        element.properties && element.properties.forEach(function(property){
          property.javascriptNode = undefined;
        });
      })

      out.elements = out.elements.concat(data.elements && data.elements.filter(function(el) { return els.indexOf(el.is) < 0 }) || []);
      out.behaviors = out.behaviors.concat(data.behaviors && data.behaviors.filter(function(be) { return bes.indexOf(be.is) < 0 }) || []);
      out.features = out.features.concat(data.features || []);

      for (var elName in data.elementsByTagName) {
        if (!out.elementsByTagName[elName]) {
          out.elementsByTagName[elName] = data.elementsByTagName[elName];
        }
      }
    });

    fs.writeFileSync(path.join(root, destDir, 'data', 'docs', elementName + '.json'), JSON.stringify(out));

    callback(null, out);
  }).catch(function(err) {
    callback(err);
  });
}