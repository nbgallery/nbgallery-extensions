#Installation

Install and enable _jupyter_nbgallery_ on your Jupyter server

```bash
pip install jupyter_nbgallery --py
jupyter serverextension enable --py jupyter_nbgallery
jupyter nbextension install --py jupyter_nbgallery
jupyter nbextension enable jupyter_nbgallery --py 
```
# Development

Check out this repo on your Jupyter server, install from source, and enable it

```bash
# cd into into the directory you checked out this project
pip install -e .
jupyter serverextension enable --py jupyter_nbgallery
jupyter nbextension install --py jupyter_nbgallery
jupyter nbextension enable jupyter_nbgallery --py 
```

