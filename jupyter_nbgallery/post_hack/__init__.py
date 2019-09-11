from notebook.utils import url_path_join, maybe_future
from notebook.services.contents.handlers import ContentsHandler
from tornado import gen, web
from urllib.parse import unquote

class PostHack(ContentsHandler):
    '''
    Hack to have POST /post/filename create a new file like PUT in the Jupyter API.
    This is a workaround for interaction with PKI and pre-flight checks in some browsers.
    '''
    @web.authenticated
    @gen.coroutine
    def post(self, path=''):
        self.log.debug('POST hack; path: ' + path)
        model = self.get_json_body()
        parts = unquote(self.request.path).split('/')
        idx = parts.index('post')
        path = '/'.join(parts[idx + 1:])
        if model:
            exists = yield maybe_future(self.contents_manager.file_exists(path))
            if exists:
                yield maybe_future(self._save(model, path))
            else:
                yield maybe_future(self._upload(model, path))
        else:
            yield maybe_future(self._new_untitled(path))

def load_jupyter_server_extension(app):
    web_app = app.web_app
    host_pattern = '.*$'
    post1 = url_path_join(web_app.settings['base_url'], '/post/.*')
    web_app.add_handlers(host_pattern, [(post1, PostHack)])
    app.log.info('nbgallery POST hack extension enabled!')
