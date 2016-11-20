define(function() {
  var load_ipython_extension = function() {
    require(['../nbextensions/jupyter-nbgallery/jquery.cookie.js'], function() {
      var base = $.cookie("nb.gallery.url")
      if (base == null) {
        base = "http://localhost:3000";
      }
      console.log("loading gallery-common integration from " + base);
      require([base + "/Jupyter/static/integration/gallery-common.js"]);
    })
  };

  return {
    load_ipython_extension: load_ipython_extension
  }
});

