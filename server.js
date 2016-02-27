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
var UberAPI = require('./Uber.js');

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

app.post('/UberRequest', function (req, res) {
  var body = _.pick(req.body, 'access_token', 'origin', 'destination');
  var req_id = UberAPI.UberRequest(body.access_token, body.origin, body.destination);
  res.send(req_id);
});

app.post('/UberDetails', function (req, res) {
  var body = _.pick(req.body, 'access_token', 'request_id');
  var details = UberAPI.UberRequestDetails(body.access_token, body.request_id);
  res.send(details);
});

app.post('/UberPriceEstimate', function (req, res) {
  var body = _.pick(req.body, 'access_token', 'origin', 'destination');
  var PriceEstimate = UberAPI.PriceEstimate(body.access_token, body.origin, body.destination);
  res.send(PriceEstimate);
});

app.post('/UberTimeEstimate', function (req, res) {
  var body = _.pick(req.body, 'access_token', 'origin');
  var timeEstimate = UberAPI.TimeEstimate(body.access_token, body.origin);
  res.send(timeEstimate)
});

app.post('/FSVenues', function (req, res) {
  var body = _.pick(req.body, 'location');
  var venues = fsquare.Venues(body.location);
  res.send(venues);
});

app.get('/FSExplore', function(req, res) {

});

app.post('/MapsDirections', function (req, res) {
  var body = _.pick(req.body, 'origin', 'destination');
  var Directions = Maps.getDirections(body.origin, body.destination);
  res.send(Directions);
});

app.post('/StaticMap', function (req, res) {
  var body = _.pick(req.body, 'origin', 'destination');
  var Map = Maps.getStaticMap(body.origin, body.destination);
  res.send(Map);
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
