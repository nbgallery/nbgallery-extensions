define(function() {
  var load_ipython_extension = function() {
    require(['base/js/utils','services/config'], function(utils,configmod) {        
      var config = new configmod.ConfigSection('common',{base_url: utils.get_body_data("baseUrl")});
      config.load();

      if (config['data'].nbgallery != undefined) {
        base = config['data'].nbgallery.url;
      } else {
        base = "https://nb.gallery/";
      }

      console.log("loading gallery-common integration from " + base);
      require([base + "/integration/gallery-common.js"]);
    })
  };

  return {
    load_ipython_extension: load_ipython_extension
  }
});

