const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

//https://home.openweathermap.org/users/sign_in
//user:qoolixiloop pw:qool1234
const apiKey = 'af7dae877015f50f6fd8ae9407af1e04';

//get access to all static files in public folder
//the css file is there
app.use(express.static('public'));

//allows to parse key:value pairs in request body
app.use(bodyParser.urlencoded({ extended: true }));

//use ejs views not pure html
app.set('view engine', 'ejs')

//get request: map '/' route to anonymous function
//send index.ejs file
//weather and error are ejs parameters in index.ejs
app.get('/', function (req, res) {

  //response is the index page
  res.render('index', {weather: null, error: null});

})

//post request: map '/' route to anonyous function
//form: action=/ method=post; input: name=city
app.post('/', function (req, res) {
  
  //bodyParser.urlencoded in action
  //key: city is part of body of request
  //value: the city name we entered
  let city = req.body.city;
  console.log(req.body.city);

  //url to post request to
  //break long line with \ or better with +
  //variable in old bash syntax with backticks
  let url = "http://api.openweathermap.org/data/2.5/weather?q=" +
    `${city}` + "&units=imperial&appid=" + `${apiKey}`

  //send request to url 
  //and define anonymous callback function with tree arguments
  //response: would be response to url
  request(url, function (err, response, body) {
    if(err){

      //response is the index page with error variable shown
      res.render('index', {weather: null, error: 'Error, please try again'});
    
    } else {

      //the body is a json object
      //JSON.parse maps it to a js variable accessable with dots
      let weather = JSON.parse(body)
      
      if(weather.main == undefined){
        
        //response is the index page with error variable shown
        res.render('index', {weather: null, error: 'Error, please try again'});
      
      } else {

        //make a string with received weather data 
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        
        //response is index page with weather variable shown
        res.render('index', {weather: weatherText, error: null});
      
      }
    }
  });
})

//server listening on port localhost:3000
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
