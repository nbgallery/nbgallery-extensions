# Overview

This package provides several Jupyter extensions to enable integration with [nbgallery](https://nbgallery.github.io).  More information is available [here](https://github.com/nbgallery/nbgallery/blob/master/docs/jupyter_integration.md) in the nbgallery github project.

# Installation

This package contains both UI extensions (_nbextensions_) and server extensions.  Install the package with `pip`, then install the nbextensions with `jupyter`.  Depending on how you have Jupyter installed, you may want to add the `--sys-prefix` or `--user` options; see `jupyter nbextension install --help` for details.

```
pip install jupyter_nbgallery
jupyter nbextension install --py jupyter_nbgallery
```

Next, enable the extensions you want to use.  *At a minimum, you need the post_hack server extension and the gallery_menu and environment nbextensions to enable the two-way integration with nbgallery.*

To enable all extensions:

```
jupyter serverextension enable --py jupyter_nbgallery
jupyter nbextension enable --py jupyter_nbgallery
```

To enable extensions independently (note that you need to specify the _section_ for nbextensions):

```
# Minimal set
jupyter nbextenstion enable --section common jupyter_nbgallery/environment/environment
jupyter nbextenstion enable --section notebook jupyter_nbgallery/gallery_menu/gallery_menu
jupyter serverextension enable jupyter_nbgallery.post_hack

# Optional
jupyter nbextenstion enable --section tree jupyter_nbgallery/autodownload/autodownload
jupyter nbextenstion enable --section notebook jupyter_nbgallery/easy_buttons/easy_buttons
jupyter nbextenstion enable --section notebook jupyter_nbgallery/instrumentation/instrumentation
```

If you are using the [Jupyter Nbextensions Configurator](https://github.com/Jupyter-contrib/jupyter_nbextensions_configurator) extension, you can also toggle the nbextensions on and off from the configurator page.

# Manual configuration

Once the extension is installed, you will also need to modify your Jupyter configuration.  The `nbconfig/common.json` must have an `nbgallery` section listing the URL of your nbgallery instance, and several options must be set in `jupyter_notebook_config.py` (or on the command line) to allow cross-site Javascript to work.  See [these instructions](https://github.com/nbgallery/nbgallery/blob/master/docs/jupyter_integration.md#manual-configuration) for details.

# Extensions

## UI Extensions (nbextensions)

### Minimal Set

 * [`environment`](https://github.com/nbgallery/nbgallery-extensions/blob/master/jupyter_nbgallery/nbextensions/environment/README.md) registers this Jupyter instance with nbgallery so notebooks can be launched with the "Run in Jupyter" button.  It also downloads preferences stored in nbgallery.
 * [`gallery_menu`](https://github.com/nbgallery/nbgallery-extensions/blob/master/jupyter_nbgallery/nbextensions/gallery_menu/README.md) adds the _Gallery_ and _Preferences_ menus to the Notebook interface.  These are necessary for saving notebooks and preferences back to nbgallery.

### Optional

 * [`autodownload`](https://github.com/nbgallery/nbgallery-extensions/blob/master/jupyter_nbgallery/nbextensions/autodownload/README.md) will download _Starred_ and _Recently Executed_ notebooks from nbgallery when you first visit the Jupyter tree page.
 * [`easy_buttons`](https://github.com/nbgallery/nbgallery-extensions/blob/master/jupyter_nbgallery/nbextensions/easy_buttons/README.md) adds buttons to the active cell for commonly-used actions.
 * [`instrumentation`](https://github.com/nbgallery/nbgallery-extensions/blob/master/jupyter_nbgallery/nbextensions/instrumentation/README.md) reports cell execution status back to nbgallery for [notebook health assessment](https://nbgallery.github.io/health_paper.html).

## Server Extensions

 * `post_hack` is an workaround for browser issues with CORS pre-flight checks when PKI certificates are involved.  The Jupyter API enables notebooks to be uploaded via a `PUT` to `/api/contents/NotebookName.ipynb`; this extension enables uploads via a `POST` to `/post/NotebookName.ipynb` as well.  The "Run in Jupyter" button in nbgallery uses the `/post` endpoint, so this extension must be enabled to launch notebooks from nbgallery.
