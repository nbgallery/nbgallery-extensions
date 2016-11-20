define(function() {
  var gallery_notebook_loaded = false;

  var load_gallery_notebook = function() {
    require(['../nbextensions/jupyter-nbgallery/jquery.cookie.js'], function() {
      if (gallery_notebook_loaded == false) {
        gallery_notebook_loaded = true;
        var base = $.cookie("nb.gallery.url")
        if (base == null) {
          base = "http://localhost:3000";
        }
        console.log("loading gallery-notebook integration from " + base);

        require([base + "/Jupyter/static/integration/gallery-notebook.js"], function() {
          Jupyter.notification_area.get_widget("notebook").set_message("Gallery Integration Loaded", 1000);
        });
      }
    })
  };

  var load_ipython_extension = function() {
    require(['base/js/events','../nbextensions/jupyter-nbgallery/jquery.cookie.js'], function(events,cookies) {
      // for some reason, we miss the notebook_loaded event for large notebooks
      // so the kernel hook is our safety
      events.on("kernel_ready.Kernel", load_gallery_notebook);
      events.on("notebook_loaded.Notebook", load_gallery_notebook);
    });
  };

  return {
    load_ipython_extension: load_ipython_extension
  }
});

