define(function() {
  var load_ipython_extension = function() {
    if (window.terminal != undefined) {
      window.terminal.term.screenKeys = true;
    }
  };

  return {
    load_ipython_extension: load_ipython_extension
  }
});
