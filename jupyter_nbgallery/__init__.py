from .post import Post
from .status import Status
from notebook.utils import url_path_join

def _jupyter_nbextension_paths():  # pragma: no cover
    return [
      {
        'section': "notebook",
        'src': "static",
        'dest': "jupyter-nbgallery",
        'require': 'jupyter-nbgallery/docker-gallery-notebook'
      },{
        'section': "tree",
        'src': "static",
        'dest': "jupyter-nbgallery",
        'require': 'jupyter-nbgallery/docker-gallery-tree'
      },{
        'section': "common",
        'src': "static",
        'dest': "jupyter-nbgallery",
        'require': 'jupyter-nbgallery/docker-gallery-common'
      },{
        'section': "common",
        'src': "static",
        'dest': "jupyter-nbgallery",
        'require': 'jupyter-nbgallery/docker-screenKeys'
      },
    ]



def _jupyter_server_extension_paths():  # pragma: no cover
    return [{
        'module': 'jupyter_nbgallery',
    }]


def load_jupyter_server_extension(app):  # pragma: no cover
  web_app = app.web_app
  host_pattern = '.*$'

  post_to_put_pattern= url_path_join(web_app.settings['base_url'], '/post/.*')
  version_pattern = url_path_join(web_app.settings['base_url'], '/version')
  status_pattern = url_path_join(web_app.settings['base_url'], '/v1/status')

  web_app.add_handlers(host_pattern, [(post_to_put_pattern, Post)])
  web_app.add_handlers(host_pattern, [(status_pattern, Status),(version_pattern, Status)])

  app.log.info("Jupyter-nbGallery enabled!")
