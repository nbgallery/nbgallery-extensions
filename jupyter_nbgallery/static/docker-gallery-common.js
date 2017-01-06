define(function() {
  var load_gallery_common = function() {
    require(['base/js/utils','services/config'], function(utils,configmod) {
      var config = new configmod.ConfigSection('common',{base_url: utils.get_body_data("baseUrl")});
      config.load();
      
      config.loaded.then(function() {
        base = config['data'].nbgallery.url;
        console.log("loading gallery-common integration from " + base);
        require([base + "/integration/gallery-common.js"]);
      });
    })
  };

  return {
    load_ipython_extension: load_gallery_common
  }
});