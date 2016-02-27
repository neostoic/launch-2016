var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var request = require('request');
var session = require('express-session');
var querystring = require('querystring');
var OAuth = require('oauth');

// General config
var Config = require('./config.json');
var configDB = require('./database.js');

// Uber functions
// var UberAPI = require('./Uber.js');
// var Uber = require('node-uber');
// var uber = new Uber({
//   client_id: config.uber_client_id,
//   client_secret: config.uber_client_secret,
//   server_token: config.uber_server_token,
//   redirect_uri: config.uber_redirect_uri,
//   name: config.uber_app_name
// });

// Maps functions
var Maps = require('./maps.js');
var GoogleMaps = require('googlemaps');
var config = require('./config.json');
var gm_API_KEY = config.maps_api_key;
var publicConfig = {
  key: gm_API_KEY,
  stagger_time:       1000,
  encode_polylines:   false,
  secure:             true,
  // proxy:              'http://localhost:3000'
};
var gmAPI = new GoogleMaps(publicConfig);

// Foursquare functions
var fsquare = require('./foursquare.js');
var Foursquare = require('foursquareVenues');
var foursquare = new Foursquare(config.fs_client_id, config.fs_client_secret);


var app = express();
var PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.get('/', function(req, res) {
	res.send('');
});

app.post('/uberauth', function (req, res) {
  console.log(req);
});

app.post('/venues', function (req, res) {
  var body = _.pick(req.body, 'location');
  
  res.send
});

app.get('/callback', function(req, res) {
  console.log(req);
  console.log(res);
});

// app.post('/lyftcancel', function(req, res) {
//   Lyft.LyftCancel(req, res);
// }
// app.post('/lyftpickup', function(req, res) {
//   Lyft.LyftPickup(req, res);
// }
// app.post('/lyftlogin', function(req, res) {
//   Lyft.LyftLogin(req, res);
// }
// app.post('/lyftping', function(req, res) {
//   Lyft.lyftping(req, res);
// }


app.listen(PORT, function() {
	console.log('Express listening on port ' + PORT + '!');
});
