#!/usr/bin/env node

//1.) the shebang above turns this .js file into a node.js file
//the env interpreter is called, 
//which searches for the node interpreter and starts it

//2.) make file executable: chmod +x cli.js
//that way it can be executed with ./cli.js arg1 arg2 ...

//3) call script as $ say-hello arg1 arg2 ...
//3.1) add package.json by running: 
//run: $ npm init
//3.2) "bin" added to package.json like so:
//  "bin":{
//    "say-hello": "./cli.js"
//  }
//3.3a) make simlink in: /usr/local/lib/node_modules 
//      dest: /usr/local/lib/node_modules/npm_init_project_1
//      path: /home/benzro/.../npm_init_project_1
//run in project folder: $ sudo npm link
//3.3b) after running script: 
//      npm_change_location_of_global_packages.sh
//      simlink is made in 
//      dest: /home/benzro/.node_modules_global/lib/node_modules
//      (and npm is also installed there again.) 

//4.) grab command line arguments
const [,,  ...args]=process.argv

//5.) incl. first two arguments which are
//interpreter: usr/bin/node
//this script: fullpath/cli.js
args2=process.argv

//6.) print hello world provided args
console.log('Hello World ${args}')
console.log(`Hello World ${args}`)
console.log(`Hello World ${args2}`)

//3.4) remove simlink
//run in project folder: $ sudo npm unlink 
