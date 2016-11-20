define(function() {
  var load_ipython_extension = function() {
    require(['/Jupyter/nbextensions/jquery-cookie.js'], function() {
      if ($.cookie("nb.gallery.url") == null) {
        var base = "";
      } else {
        var base = $.cookie("nb.gallery.url");
        console.log("loading gallery-common integration from " + base);
      }

      require([base + "/Jupyter/static/integration/gallery-common.js"]);
    });
  };

  return {
    load_ipython_extension: load_ipython_extension
  }
});

