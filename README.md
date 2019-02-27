# Overview

This Jupyter extension enables integration with [nbgallery](https://nbgallery.github.io).  More information is available [here](https://github.com/nbgallery/nbgallery/blob/master/docs/jupyter_integration.md) in the nbgallery github project.

# Installation

Install and enable _jupyter_nbgallery_ on your Jupyter server

```bash
pip install jupyter_nbgallery -U
jupyter serverextension enable --py jupyter_nbgallery
jupyter nbextension install --py jupyter_nbgallery
jupyter nbextension enable jupyter_nbgallery --py 
```
# Development

Check out this repo on your Jupyter server, install from source, and enable it

```bash
# cd into the directory you checked out this project
pip install -e .
jupyter serverextension enable --py jupyter_nbgallery
jupyter nbextension install --py jupyter_nbgallery
jupyter nbextension enable jupyter_nbgallery --py 
```

# Deploying

A walkthrough for deploying to PyPi can be found here: https://packaging.python.org/tutorials/packaging-projects/
