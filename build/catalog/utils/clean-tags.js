var excluded = ['web-components','polymer','web-component'];
module.exports = function(tag) {
  return excluded.indexOf(tag.toLowerCase()) < 0;
}