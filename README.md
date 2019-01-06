## Intro
Repository contains projects from different sources, some of them changed, and many of them commented on each line.

## Projects

### 1_node_http-server_hello-world-respoonse
#### Run project
$ node main.js
#### Code
- Shows how to start server on localhost:8081  
- Send response to page: Hello World.  

### 2_npm_run-with-different-names_parse-arguments
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

### 3_npm_weather-app
#### Source
https://codeburst.io/build-a-weather-website-in-30-minutes-with-node-js-express-openweather-a317f904897b
#### Run project
$ node server.js
Browser: localhost:3000
#### Code
Shows the use of the express module, the request of data from an API on some webpage with the request module, the use of ejs view engine to parametrize html page, and some css styling.  
Code patterns:  
```html
<fieldset>
  <form action="/" method="post">
    <input name="city" type="text" class="ghost-input" 
    placeholder="Enter a City" required>
    <input type="submit" class="ghost-button" value="Get Weather">
  </form>
  <% if(weather !== null){ %>
    <p><%= weather %></p>
  <% } %>
  <% if(error !== null){ %>
    <p><%= error %></p>
  <% } %>
</fieldset>
```
```js
//express module
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()
//get access to all static files in public folder
app.use(express.static('public'));
//allows to parse key:value pairs in request body
app.use(bodyParser.urlencoded({ extended: true }));
//use ejs views not pure html
app.set('view engine', 'ejs')
//get request on route '/'
app.get('/', function (req, res) {
  //response is the index page with eje parameters
  res.render('index', {weather: null, error: null});
})
//post request on route '/'
app.post('/', function (req, res) {
  //url of weather map API
  let url = "http://api.openweathermap.org/data/2.5/weather?q=" +
    `${city}` + "&units=imperial&appid=" + `${apiKey}`
  //send request to url and give response to anonymous function
  request(url, function (err, response, body) {
    /response is the index page with eje parameters
    res.render('index', {weather: weatherText, error: null});
  });
})
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
```
### 4_npm_todo-app

### 5_npm_build-tool
