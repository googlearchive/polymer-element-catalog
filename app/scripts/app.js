(function(exports) {
  var appBar = null;

  document.addEventListener('DOMContentLoaded', function(e) {
    appBar = document.querySelector('app-bar');
  });

  document.addEventListener('click', function(e) {
    if (appBar && appBar.showingSearch) {
      appBar.toggleSearch(e);
    }
  });
})(window);