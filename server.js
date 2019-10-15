  var express = require('express')
  var app = express()
  var port = process.env.PORT || 3000
  var mongoose = require('mongoose')
  var Task = require('./api/model/weatherModel.js') //created model loading here
  var bodyParser = require('body-parser');
  var path = require('path');
  var city = 'asheville';
  var apiKey = 'ae9abfcc1f4bca32ef7d348d17362e62';
  var openWeatherurl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  var analyze = './api/analysisFunctions.js/analyze.js';
  let request = require('request');

function getrain(){
  request(openWeatherurl, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    let weather = JSON.parse(body)
    let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
    console.log(message);

    }
  })
};

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('young-hamlet-89309.herokuapp.com/', function(req, res) {
    res.sendFile(path.join(__dirname + '/api/interface/index.html'));
});

app.get('/getrain', getrain)


var routes = require('./api/routes/weatherRoutes'); //importing route
routes(app); //register the route


app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
