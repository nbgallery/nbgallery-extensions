[![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)

# Overview

This package provides several Jupyter extensions to enable integration with [nbgallery](https://nbgallery.github.io).  More information is available [here](https://github.com/nbgallery/nbgallery/blob/master/docs/jupyter_integration.md) in the nbgallery github project.

# Installation

This package contains UI extensions (_nbextensions_) for NBClassic only.  The server extension was migrated to jupyterlab_nbgallery To install with pip:

```
pip install jupyter_nbgallery
```

As of version 2.0, the minimal set of extensions required for nbgallery integration will be automatically installed and enabled.  This includes the `post_hack` server extension, the nbgallery environment registration UI extension, and the Gallery menu UI extension.  

To enable the optional extensions:

```
# Enable all extensions
jupyter nbclassic-extension enable --sys-prefix --py jupyter_nbgallery

# Enable individual extensions
jupyter nbclassic-extension enable --sys-prefix --section tree jupyter_nbgallery/autodownload/autodownload
jupyter nbclassic-extension enable --sys-prefix --section notebook jupyter_nbgallery/easy_buttons/easy_buttons
jupyter nbclassic-extension enable --sys-prefix --section notebook jupyter_nbgallery/instrumentation/instrumentation
```

# Jupyter configuration

Once the extension is installed, you will also need to modify your Jupyter configuration to interact with your nbgallery server.

First, your Jupyter instance needs to know about your nbgallery server in order to save notebooks, download preferences, etc.  This is configured in `nbconfig/common.json` underneath one of Jupyter's [configuration directories](https://jupyter.readthedocs.io/en/latest/projects/jupyter-directories.html#configuration-files).  You can use the included `jupyter nbgallery` script to set the location of your nbgallery, as well as the Jupyter client name that will appear in nbgallery's "Run in Jupyter" Environments page.

```
# Set nbgallery server location:
# jupyter nbgallery [--user|--system|--sys-prefix] configure url <nbgallery server address>
# Example:
jupyter nbgallery --sys-prefix configure url http://localhost:3000

# Set nbgallery environment client name
# Example:
jupyter nbgallery --sys-prefix configure client.name my-jupyter-instance
```

After configuration, `nbconfig/common.json` should look something like this (potentially with other unrelated sections):

```
{
  "nbgallery": {
    "url": "http://localhost:3000",
    "client": {
      "name": "my-jupyter-instance"
    }
  }
}
```

Second, in order for nbgallery's "Run in Jupyter" button to work, Jupyter must be configured to allow cross-site AJAX.  **Note these are security-relevant configuration settings.**  These can be set in `jupyter_notebook_config.py`:

```
c.NotebookApp.allow_origin = <URL of your nbgallery instance>`
c.NotebookApp.allow_credentials = True
c.NotebookApp.disable_check_xsrf = True
```

These can also be set on the command line when launching Jupyter; for example:

```
jupyter notebook --NotebookApp.allow_origin='http://localhost:3000' --NotebookApp.allow_credentials=True --NotebookApp.disable_check_xsrf=True
```

If you are launching `jupyter lab` instead of `jupyter notebook`, be aware that as of Lab 3.0, these are now `ServerApp` settings that can be set in `jupyter_server_config.py` (see the [migration guide](https://jupyter-server.readthedocs.io/en/stable/operators/migrate-from-nbserver.html)).

# List of Extensions

## UI Extensions (nbextensions)

### Minimal Set

 * [`environment`](https://github.com/nbgallery/nbgallery-extensions/blob/master/jupyter_nbgallery/nbextensions/environment/README.md) registers this Jupyter instance with nbgallery so notebooks can be launched with the "Run in Jupyter" button.  It also downloads preferences stored in nbgallery.
 * [`gallery_menu`](https://github.com/nbgallery/nbgallery-extensions/blob/master/jupyter_nbgallery/nbextensions/gallery_menu/README.md) adds the _Gallery_ and _Preferences_ menus to the Notebook interface.  These are necessary for saving notebooks and preferences back to nbgallery.

### Optional

 * [`autodownload`](https://github.com/nbgallery/nbgallery-extensions/blob/master/jupyter_nbgallery/nbextensions/autodownload/README.md) will download _Starred_ and _Recently Executed_ notebooks from nbgallery when you first visit the Jupyter tree page.
 * [`easy_buttons`](https://github.com/nbgallery/nbgallery-extensions/blob/master/jupyter_nbgallery/nbextensions/easy_buttons/README.md) adds buttons to the active cell for commonly-used actions.
 * [`instrumentation`](https://github.com/nbgallery/nbgallery-extensions/blob/master/jupyter_nbgallery/nbextensions/instrumentation/README.md) reports cell execution status back to nbgallery for [notebook health assessment](https://nbgallery.github.io/health_paper.html).

