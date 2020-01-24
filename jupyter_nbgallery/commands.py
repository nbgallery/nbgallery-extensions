import argparse
import json
import os
import sys

import jupyter_core.paths as jp

def get_config_dir(args):
    if args.system:
        return jp.SYSTEM_CONFIG_PATH[0]
    elif args.sys_prefix:
        return jp.ENV_CONFIG_PATH[0]
    else:
        return jp.jupyter_config_dir()

def get_config_filename(args):
    config_dir = get_config_dir(args)
    return os.path.join(config_dir, 'nbconfig', 'common.json')

def show(filename, args):
    if not os.path.exists(filename):
        print('{} does not exist'.format(filename))
        return
    with open(filename) as f:
        config = json.load(f)
    if 'nbgallery' in config:
        print(json.dumps(config['nbgallery'], indent=2))
    else:
        print('No nbgallery config in {}'.format(filename))

def configure(filename, args):
    # Read existing config
    if os.path.exists(filename):
        with open(filename) as f:
            config = json.load(f)
    else:
        config = {}

    # Set key=value in nbgallery section of config.
    # Specify nesting via key1.key2.key3
    keys = args.key.split('.')
    if 'nbgallery' not in config:
        config['nbgallery'] = {}
    nbg = config['nbgallery']
    for k in keys[:-1]:
        if k not in nbg:
            nbg[k] = {}
        nbg = nbg[k]
    nbg[keys[-1]] = args.value

    # Save config back to file
    with open(filename, 'w') as f:
        json.dump(config, f, indent=2)



def main():
    parser = argparse.ArgumentParser(description='Configure nbgallery extensions')
    parser.add_argument('--user', action='store_true', default=True, help='Apply the operation for the current user')
    parser.add_argument('--system', action='store_true', default=False, help='Apply the operation system-wide')
    parser.add_argument('--sys-prefix', action='store_true', default=False, help='Apply the operation in sys.prefix')
    parser.set_defaults(func=show)

    subparsers = parser.add_subparsers(help='sub-command help')
    parser_show = subparsers.add_parser('show', help='show current nbgallery config')
    parser_show.set_defaults(func=show)
    parser_configure = subparsers.add_parser('configure', help='set nbgallery config')
    parser_configure.add_argument('key')
    parser_configure.add_argument('value')
    parser_configure.set_defaults(func=configure)

    args = parser.parse_args()
    filename = get_config_filename(args)
    args.func(filename, args)
