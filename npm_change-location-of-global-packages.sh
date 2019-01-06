#!/usr/bin/bash

# 1.) per default npm is installed in a location owned by root.
# the default location is, prefix:  /usr/local
# this poses a security risk since modules have to be installed with sudo

# 2.) change the default location, prefix: $HOME
cd ~ && mkdir .node_modules_global
npm config set prefix=$HOME/.node_modules_global

# 3.) check the result
npm config get prefix
cat .npmrc

# 4.) install npm a second time in a user owned location
npm install npm --global

# 5.) set path variable 
# append in: .bashrc or .profile or .bash_profile
echo 'export PATH="$HOME/.node_modules_global/bin:$PATH"' >> $HOME/.bashrc

# 6.) source .bashrc
source ~/.bashrc

# 7.) check results
which npm
npm --version
