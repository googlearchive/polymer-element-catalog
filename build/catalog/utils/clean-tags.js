var excluded = ['web-components','polymer','web-component','gold','paper','google','iron'];
module.exports = function(tag) {
  return excluded.indexOf(tag.toLowerCase()) < 0;
}