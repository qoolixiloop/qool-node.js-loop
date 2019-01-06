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

### Original Text
Simple Node.js Command Line Weather Application

* Check out the **[Live Demo](https://simple-nodejs-weather-app-irhhpddsku.now.sh/)**
* Read the full tutorial on how to build this application at [codeburst.io](https://codeburst.io)
* Run the web app locally:
```
node server.js
// Now open your browser and visit: localhost:3000
```
![gif](https://github.com/bmorelli25/simple-nodejs-weather-app/blob/master/giphy.gif?raw=true 'website gif')
