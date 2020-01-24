[![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)

# Overview

This package provides several Jupyter extensions to enable integration with [nbgallery](https://nbgallery.github.io).  More information is available [here](https://github.com/nbgallery/nbgallery/blob/master/docs/jupyter_integration.md) in the nbgallery github project.

# Installation

This package contains both UI extensions (_nbextensions_) and server extensions.  Install the package with `pip`, then install the nbextensions with `jupyter`.  Depending on how you have Jupyter installed, you may want to add the `--system`, `--sys-prefix`, or `--user` options; see `jupyter nbextension install --help` for details.

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
c.JupyterApp.allow_origin = <URL of your nbgallery instance>`
c.JupyterApp.allow_credentials = True
c.JupyterApp.disable_check_xsrf = True
```

These can also be set on the command line when launching Jupyter; for example:

```
jupyter notebook --JupyterApp.allow_origin='http://localhost:3000' --JupyterApp.allow_credentials=True --JupyterApp.disable_check_xsrf=True
```

# List of Extensions

## UI Extensions (nbextensions)

### Minimal Set

 * [`environment`](https://github.com/nbgallery/nbgallery-extensions/blob/master/jupyter_nbgallery/nbextensions/environment/README.md) registers this Jupyter instance with nbgallery so notebooks can be launched with the "Run in Jupyter" button.  It also downloads preferences stored in nbgallery.
 * [`gallery_menu`](https://github.com/nbgallery/nbgallery-extensions/blob/master/jupyter_nbgallery/nbextensions/gallery_menu/README.md) adds the _Gallery_ and _Preferences_ menus to the Notebook interface.  These are necessary for saving notebooks and preferences back to nbgallery.

### Optional

 * [`autodownload`](https://github.com/nbgallery/nbgallery-extensions/blob/master/jupyter_nbgallery/nbextensions/autodownload/README.md) will download _Starred_ and _Recently Executed_ notebooks from nbgallery when you first visit the Jupyter tree page.
 * [`easy_buttons`](https://github.com/nbgallery/nbgallery-extensions/blob/master/jupyter_nbgallery/nbextensions/easy_buttons/README.md) adds buttons to the active cell for commonly-used actions.
 * [`instrumentation`](https://github.com/nbgallery/nbgallery-extensions/blob/master/jupyter_nbgallery/nbextensions/instrumentation/README.md) reports cell execution status back to nbgallery for [notebook health assessment](https://nbgallery.github.io/health_paper.html).

## Server Extensions

 * [`post_hack`](https://github.com/nbgallery/nbgallery-extensions/tree/master/jupyter_nbgallery/post_hack) is a workaround for browser issues with CORS pre-flight checks when PKI certificates are involved.  The Jupyter API enables notebooks to be uploaded via a `PUT` to `/api/contents/NotebookName.ipynb`; this extension enables uploads via a `POST` to `/post/NotebookName.ipynb` as well.  The "Run in Jupyter" button in nbgallery uses the `/post` endpoint, so this extension must be enabled to launch notebooks from nbgallery.
