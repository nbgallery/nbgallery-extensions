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
    require(['../nbextensions/jupyter-nbgallery/bootbox.min.js'], function(bootbox) {
      require([base + "/Jupyter/static/integration/gallery-common.js", base + "/Jupyter/static/integration/gallery-tree.js"], function(){
        console.log("Successfully loaded gallery integration scripts from " + base)
      }, function(error) {
        update_gallery_url(null)
        console.log("Failed to load gallery integration scripts from " + base)
        bootbox.alert('Warning: Jupyter was unable to load nbGallery dependencies from the provided URL. Please verify it is correct and try again.')
      })
    })
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

  var add_gallery_configuration_menu = function() {
    var gallery_menu = $('#gallery_menu')
    gallery_menu.empty()
    gallery_menu.append('<a class="dropdown-toggle" data-toggle="dropdown">Gallery</a>')
    var links = $('<li>')
    links.append('<a href="#" id="set_gallery" >Set Gallery URL</a>')
    gallery_menu.append($('<ul class="dropdown-menu">').append(links))
    $('#set_gallery').click(function() {
      require(['../nbextensions/jupyter-nbgallery/bootbox.min.js'], function(bootbox) {
        bootbox.prompt("Set Gallery Location", function(base) {
          load_extensions(base)
        })
        var bootbox_input = $('input.bootbox-input')
        console.log(bootbox_input)
        Jupyter.keyboard_manager.register_events(bootbox_input)
      })
    })
  }
  var load_ipython_extension = function() {
    var gallery_menu = $('<li id="gallery_menu" class="dropdown">')
    $('ul.nav.navbar-nav').append(gallery_menu);

    base = get_gallery_url()
    if (!base) {
      add_gallery_configuration_menu()
    } else {
      load_extensions(base)
    }
  };

  return {
    load_ipython_extension: load_ipython_extension
  }
});

