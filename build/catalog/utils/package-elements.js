var _ = require('lodash');

module.exports = function (imports) {

  var name = imports.name;
  var deps = imports.deps;

  deps = deps || {};

  return _(deps).keys().value();
}