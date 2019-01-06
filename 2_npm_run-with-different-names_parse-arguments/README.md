## 2_npm_run-with-different-names_parse-arguments
#### Source
https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e
#### Run project
$ node cli.js
$ ./ cli.js
$ say-hello
#### Code
Shows three different ways to run the script.  
1. $ node ./filename args ...  
2. $ ./filename args ...  
3. $ newName args ...  
Code patterns:  
```json
"bin": {
  "say-hello": "./cli.js"
}
```
```js
// args are parsed from command line string
const [,,  ...args]=process.argv

// and console printed in different ways
console.log("Hello World" + args2)
```
