define(function() {
  var load_ipython_extension = function() {
    require(['../nbextensions/jupyter-nbgallery/jquery.cookie.js'], function() {
      var base = $.cookie("nb.gallery.url")
      if (base == null) {
        var base = "http://localhost:3000";
      }
      console.log("loading gallery-tree integration from " + base);
      require([base + "/Jupyter/static/integration/gallery-tree.js"]);
    });
  };

  return {
    load_ipython_extension: load_ipython_extension
  }
});
