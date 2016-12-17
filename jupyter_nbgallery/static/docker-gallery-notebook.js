define(function() {
  var gallery_notebook_loaded = false;

  var load_gallery_notebook = function() {
    require(['base/js/utils','services/config'], function(utils,configmod) {
      if (gallery_notebook_loaded == false) {
        gallery_notebook_loaded = true;
        
        var config = new configmod.ConfigSection('common',{base_url: utils.get_body_data("baseUrl")});
        config.load();

        if (config['data'].nbgallery != undefined) {
          base = config['data'].nbgallery.url;
        } else {
          base = "https://nb.gallery/";
        }

        console.log("loading gallery-notebook integration from " + base);

        require([base + "/integration/gallery-notebook.js"], function() {
          Jupyter.notification_area.get_widget("notebook").set_message("Gallery Integration Loaded", 1000);
        });
      }
    })
  };

  var load_ipython_extension = function() {
    require(['base/js/events'], function(events) {
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

