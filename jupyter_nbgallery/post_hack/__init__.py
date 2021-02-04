from jupyter_server.utils import url_path_join, ensure_async
from jupyter_server.services.contents.handlers import ContentsHandler
from tornado import web
from urllib.parse import unquote

class PostHack(ContentsHandler):
    '''
    Hack to have POST /post/filename create a new file like PUT in the Jupyter API.
    This is a workaround for interaction with PKI and pre-flight checks in some browsers.
    '''
    @web.authenticated
    async def post(self, path=''):
        self.log.debug('POST hack; path: ' + path)
        model = self.get_json_body()
        parts = unquote(self.request.path).split('/')
        idx = parts.index('post')
        path = '/'.join(parts[idx + 1:])
        if model:
            exists = await ensure_async(self.contents_manager.file_exists(path))
            if exists:
                await ensure_async(self._save(model, path))
            else:
                await ensure_async(self._upload(model, path))
        else:
            await ensure_async(self._new_untitled(path))

# Entrypoint for (new) Jupyter Server extension
def _load_jupyter_server_extension(app):
    web_app = app.web_app
    host_pattern = '.*$'
    post1 = url_path_join(web_app.settings['base_url'], '/post/.*')
    web_app.add_handlers(host_pattern, [(post1, PostHack)])
    app.log.info('nbgallery POST hack extension enabled!')

# Entrypoint for (old) Notebook serverextension
load_jupyter_server_extension = _load_jupyter_server_extension
