module.exports = function (version) {
  
  return (version.indexOf('#') > 0) ? version.split('#')[1] : version;
}