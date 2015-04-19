module.exports = function(v) {
  if (v.indexOf('#') > 0) {
    return v.split('#')[1];
  } else {
    return v;
  }
}