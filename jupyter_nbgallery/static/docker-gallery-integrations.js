var gallery_notebook_loaded = false;

define(function() {
  var get_gallery_url = function() {
    var cell = Jupyter.notebook.get_selected_cell();
    var config = cell.config.data;
    return (config.nbgallery) ? config.nbgallery.url : null
  }
  var update_gallery_url = function(value){
    var cell = Jupyter.notebook.get_selected_cell();
    var config = cell.config;
    var patch = {nbgallery: {url: value}}
    config.update(patch);
  }

  var load_gallery_notebook = function(base) {
    if (gallery_notebook_loaded == false) {
      gallery_notebook_loaded = true;
      console.log("loading gallery-notebook integration from " + base);

      require([base + "/Jupyter/static/integration/gallery-notebook.js"], function() {
        Jupyter.notification_area.get_widget("notebook").set_message("Gallery Integration Loaded", 1000);
      });
    }
  };
  var load_extensions = function(base) {
    update_gallery_url(base)
    require([base + "/Jupyter/static/integration/gallery-common.js"])
    require([base + "/Jupyter/static/integration/gallery-tree.js"])
    require(['base/js/events', "../nbextensions/jupyter-nbgallery/jquery.cookie.js"], function(events, cookies) {
      // for some reason, we miss the notebook_loaded event for large notebooks
      // so the kernel hook is our safety
      events.on("kernel_ready.Kernel", load_gallery_notebook(base));
      events.on("notebook_loaded.Notebook", load_gallery_notebook(base));
    }, function(error) {
      //TODO- Handle errors gracefully
      console.log('Error requiring events and jquery.cookies', error)
    });
  }

  var load_ipython_extension = function() {
    //TODO- Read default gallery location from settings. If it doesn't exist, then prompt.
    //TODO- Initialize Gallery menu item with "Set Gallery Location", 
    require(['../nbextensions/jupyter-nbgallery/bootbox.min.js'], function(bootbox) {
      base = get_gallery_url()
      console.log(Jupyter.notebook.get_selected_cell().config)
      console.log(base)
      if (!base) {
        bootbox.prompt("Set Gallery Location", function(base) {
          load_extensions(base)
        })
      } else {
        load_extensions(base)
      }
    })
  };

  return {
    load_ipython_extension: load_ipython_extension
  }
});

