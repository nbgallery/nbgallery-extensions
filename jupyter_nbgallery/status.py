import os

from notebook.utils import url_path_join
from notebook.base.handlers import IPythonHandler

class Status(IPythonHandler):
  def get(self):
    # TODO 
    self.finish(os.environ['']);

def load_jupyter_server_extension(app):
  web_app = app.web_app
  host_pattern = '.*$'
  version_pattern = url_path_join(web_app.settings['base_url'], '/version')
  status_pattern = url_path_join(web_app.settings['base_url'], '/v1/status')
  web_app.add_handlers(host_pattern, [(status_pattern, Status),(version_pattern, Status)])

