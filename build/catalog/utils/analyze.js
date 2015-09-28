var path = require('path');
var fs = require('fs-extra');
var Analyzer = require('hydrolysis').Analyzer;
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
    return Analyzer.analyze(path,
      {
        clean: true,
        filter: function(href){
          if (href.indexOf("http://") > -1 || href.indexOf("https://") > -1) {
            return true;
          } else {
            return false;
          }
        }
      })
    .then(function(analyzer){
      return {
        elements: analyzer.elementsForFolder(path),
        behaviors: analyzer.behaviorsForFolder(path),
        features: []
      };
    });
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

      data.elements.forEach(function(element) {
        if (!out.elementsByTagName[element.is]) {
          out.elementsByTagName[element.is] = element;
        }
      });
    });

    fs.writeFileSync(path.join(root, destDir, 'data', 'docs', elementName + '.json'), JSON.stringify(out));

    callback(null, out);
  }).catch(function(err) {
    console.error(err.stack);
    callback(err);
  });
}