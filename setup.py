# coding: utf8

# Copyright (C) 2016 Ryan Festag
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License along
# with this program. If not, see <http://www.gnu.org/licenses/>.

from setuptools import setup, find_packages

# Use README as long_description
import os
this_directory = os.path.abspath(os.path.dirname(__file__))
with open(os.path.join(this_directory, 'README.md'), encoding='utf-8') as f:
    long_description = f.read()

data_files = []

# Auto-install nbextensions
for root, dirs, files in os.walk('jupyter_nbgallery/nbextensions'):
    root_files = [os.path.join(root, i) for i in files]
    if root_files:
        install_root = root.replace('jupyter_nbgallery/nbextensions', 'share/jupyter/nbextensions/jupyter_nbgallery')
        data_files.append((install_root, root_files))

# Auto-enable server extensions and minimal set of nbextensions
data_files += [
    (
        "etc/jupyter/nbconfig/common.d",
        ["jupyter-config/nbconfig/common.d/jupyter_nbgallery.json"]
    ),
    (
        "etc/jupyter/nbconfig/notebook.d",
        ["jupyter-config/nbconfig/notebook.d/jupyter_nbgallery.json"]
    ),
    (
        "etc/jupyter/jupyter_notebook_config.d",
        ["jupyter-config/jupyter_notebook_config.d/jupyter_nbgallery.json"]
    ),
    (
        "etc/jupyter/jupyter_server_config.d",
        ["jupyter-config/jupyter_server_config.d/jupyter_nbgallery.json"]
    ),
]


setup(
    name='jupyter-nbgallery',
    version='2.0.0',
    description='Jupyter extensions to add nbgallery integration',
    long_description=long_description,
    long_description_content_type='text/markdown',
    url='https://github.com/nbgallery/nbgallery-extensions',
    author='Ryan Festag',
    author_email='rfestag@gmail.com',
    license='MIT',
    packages=find_packages(),
    data_files=data_files,
    include_package_data=True,
    install_requires=[
        'jupyter_server',
    ],
    entry_points={
        'console_scripts': ['jupyter-nbgallery=jupyter_nbgallery.commands:main']
    }
)
