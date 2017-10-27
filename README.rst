Scids-client is a python library for accessing interacting with SciDataspace. 

**Pre-requirements**

* git   
* python-dev 
* python-setuptools
* g++
* docker

**Download**

``git clone https://tanum@bitbucket.org/geotrust/sciunit-cli.git``

**Install**

Use the setup.py script to install this library:

::

 cd sciunit-cli/sciunit/client
 sudo python setup.py install
 cd ../..
 sudo python setup.py install

The library can also be installed as a normal user in a virtualenv, or using the --user option to install.

**Usage**

Follow documentation at sciunit.org

**Known Errors**

error: Setup script exited with error in docker-py setup command: 
Invalid environment marker: python_version < "3.5"

Solution: 
::
 pip install setuptools --upgrade
 
error:ssl.SSLError: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed (_ssl.c:590)

Solution:
::
 export PYTHONHTTPSVERIFY=0
