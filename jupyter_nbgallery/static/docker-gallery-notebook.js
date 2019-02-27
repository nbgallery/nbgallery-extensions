define(function() {
  var gallery_notebook_loaded = false;

  var load_gallery_notebook = function() {
    require(['base/js/utils','services/config'], function(utils,configmod) {
      if (gallery_notebook_loaded == false) {
        gallery_notebook_loaded = true;

        // Load extensions hosted at nbgallery
        var cconfig = new configmod.ConfigSection('common',{base_url: utils.get_body_data("baseUrl")});
        cconfig.load();
        cconfig.loaded.then(function() {
          if(!cconfig['data'].nbgallery || !cconfig['data'].nbgallery.url) {
            return;
          }
          var nbgallery = cconfig['data'].nbgallery;
          var base = nbgallery.url;
          console.log("loading gallery-notebook integration from " + base);

          require([base + "/integration/gallery-notebook.js"], function() {
            Jupyter.notification_area.get_widget("notebook").set_message("Gallery Integration Loaded", 1000);
          });

          if (nbgallery.extra_integration && nbgallery.extra_integration.notebook) {
            extras = nbgallery.extra_integration.notebook;
            for (i in extras) {
              console.log("loading extra notebook integration " + extras[i]);
              require([base + "/integration/" + extras[i]]);
            }
          }
        });

        // Apply editor config
        nbconfig = new configmod.ConfigSection('notebook', {base_url: utils.get_body_data("baseUrl")});
        nbconfig.load();
        nbconfig.loaded.then(function() {
          if(!nbconfig['data'].CodeCell || !nbconfig['data'].CodeCell.cm_config) {
            return;
          }
          var code_config = nbconfig['data'].CodeCell.cm_config;
          for(setting in code_config) {
            Jupyter.CodeCell.options_default['cm_config'][setting] = code_config[setting];
          }
          var cells = Jupyter.notebook.get_cells();
          for (var i in cells) {
            var c = cells[i];
            if (c.cell_type === 'code') {
              for(setting in code_config) {
                c.code_mirror.setOption(setting, code_config[setting]);
              }
            }
          }
        });
      };
    })
  };

  var load_ipython_extension = function() {
    require(['base/js/events'], function(events) {
      // For some reason, we miss the notebook_loaded event for large notebooks
      // so the kernel hook is our safety.
      // If we already missed the event, call our load function explicitly.
      if (Jupyter.notebook.kernel.is_connected()) {
        load_gallery_notebook();
      }
      events.on("kernel_ready.Kernel", load_gallery_notebook);
      events.on("notebook_loaded.Notebook", load_gallery_notebook);
    });
  };

  return {
    load_ipython_extension: load_ipython_extension
  }
});
