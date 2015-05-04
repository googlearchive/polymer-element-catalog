var marked = require('marked');

var renderer = new marked.Renderer();
var firstHeading = true;
var permalinks = [];

renderer.heading = function(text, level) {
  var permalink = text.toLowerCase().replace(/[^\w]+/g, '-');
  if (permalinks.indexOf(permalink) >= 0) {
    permalink = permalink + "-1";
  }
  permalinks.push(permalink);
  
  var htext = '<h' + level + ' id="' + permalink + '">' + text + '</h' + level + '>';

  if (level === 2) {
    var out = "";
    firstHeading ? firstHeading = false : out += "</section>\n\n";
    return out + '<section class="guide-section">\n' + htext + '\n';
  } else {
    return htext;
  }
}

module.exports = function(content) {
  permalinks = [];
  firstHeading = true;
  
  var out = marked(content, {renderer: renderer});
  out += '</section>'
  return out;
}