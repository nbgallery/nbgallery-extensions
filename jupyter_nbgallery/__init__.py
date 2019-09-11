def _jupyter_nbextension_paths():
    return [
        {
            'section' : 'common',
            'src' : 'nbextensions',
            'dest' : 'jupyter_nbgallery',
            'require' : 'jupyter_nbgallery/environment/environment',
        },
        {
            'section' : 'tree',
            'src' : 'nbextensions',
            'dest' : 'jupyter_nbgallery',
            'require' : 'jupyter_nbgallery/autodownload/autodownload',
        },
        {
            'section' : 'notebook',
            'src' : 'nbextensions',
            'dest' : 'jupyter_nbgallery',
            'require' : 'jupyter_nbgallery/gallery_menu/gallery_menu',
        },
        {
            'section' : 'notebook',
            'src' : 'nbextensions',
            'dest' : 'jupyter_nbgallery',
            'require' : 'jupyter_nbgallery/instrumentation/instrumentation',
        },
        {
            'section' : 'notebook',
            'src' : 'nbextensions',
            'dest' : 'jupyter_nbgallery',
            'require' : 'jupyter_nbgallery/easy_buttons/easy_buttons',
        },
    ]

def _jupyter_server_extension_paths():  
    return [
        {'module': 'jupyter_nbgallery.post_hack'},
    ]
