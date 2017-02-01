define(function() {
  var load_gallery_tree = function() {
    require(['base/js/utils','services/config'], function(utils,configmod) {
      var config = new configmod.ConfigSection('common',{base_url: utils.get_body_data("baseUrl")});
      config.load();
      
      config.loaded.then(function() {
        var nbgallery = config['data'].nbgallery;
        var base = nbgallery.url;
        console.log("loading gallery-tree integration from " + base);
        require([base + "/integration/gallery-tree.js"]);
        if (nbgallery.extra_integration != undefined) {
          if (nbgallery.extra_integration.tree != undefined) {
            extras = nbgallery.extra_integration.tree;
            for (i in extras) {
              console.log("loading extra tree integration " + extras[i]);
              require([base + "/integration/" + extras[i]]);
            }
          }
        }
      });
    })
  };

  return {
    load_ipython_extension: load_gallery_tree
  }
});
