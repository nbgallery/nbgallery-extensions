#Installation

```bash
#Clone this repo to Jupyter (until we publish to pypi), and install locally
git clone https://github.com/nbgallery/nbgallery-extensions
cd nbgallery-extensions
pip install -e .

jupyter serverextension enable --py jupyter_nbgallery
jupyter nbextension install --py jupyter_nbgallery
jupyter nbextension enable jupyter_nbgallery --py 
```
