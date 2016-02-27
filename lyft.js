var exports = module.exports = {};
var _ = require('underscore');
var request = require('request');
var querystring = require('querystring');

exports.LyftLogin = function(req, res) {
  var body = _.pick(req.body, 'facebook_token');
  var token = {
    'fbToken' : body.facebook_token;
  };

  request.post({
    url: 'https://api.lyft.com/users',
    json: token,
    headers: {
      'Authorization': 'fbAccessToken ' + body.facebook_token
    }}, function (err, response) {
      if (err) throw err;
      res.send({
          'id': response.body.user.id,
          'name': response.body.user.firstName + ' ' + response.body.user.lastName,
          'token': response.body.user.lyftToken
      });
    });
}

exports.LyftPickup = function(req, res) {
  var body = _.pick(req.body, 'lyft_token', 'location');
  var loc = {
    'startLat' : body.location.lat,
    'startLng' : body.location.lng
  };
  request.post({
    url: 'https://api.lyft.com/rides',
    json: loc,
    headers: {
      'Authorization': 'lyftToken ' + body.lyft_token
    }}, function (err, response) {
      if (err) throw err;
      res.send(response.body);
    });
}

exports.LyftCancel = function(req, res) {
  var body = _.pick(req.body, 'lyft_token', 'location', 'ride_id');
  var cancelstatus = {
    'status' : 'canceled',
    'lat' : body.location.lat,
    'lng' : body.location.lng
  };
  request.post({
    url: 'https://api.lyft.com/rides' + body.ride_id,
    json: cancelstatus,
    headers: {
      'Authorization': 'lyftToken ' + body.lyft_token
    }}, function (err, response) {
      if (err) throw err;
      res.send(response.body);
    });
}

exports.LyftPing = function(req, res) {
  var body = _.pick(req.body, 'lyft_token', 'location', 'user_id');
  var user_data = {
    'rideType' : 'standard',
    'marker' : {
      'lat' : body.location.lat,
      'lng' : body.location.lng
    },
    'locations': [{
      'recordedAt': (new Date()).toISOString(),
      'userMode': 'passenger',
      'fg': true,
      'speed': 0,
      'lat': body.location.lat,
      'lng': body.location.lng,
      'bearing': -1,
      'accuracy': 5
    }]
  };

  request.post({
    url: 'https://api.lyft.com/users' + body.user_id + '/location',
    json: user_data,
    headers: {
      'Authorization': 'lyftToken ' + body.lyft_token
      'User-Agent' : 'lyft:iOS:7.1.2:2.2.4.189',
      'User-Device' : 'iPhone6,1',
      'Accept' : 'application/vnd.lyft.app+json;version=14'
    }}, function (err, response) {
      if (err) throw err;

      if (response.body.ride) {
        var ride = response.body.ride;
        delete ride.pricingModel;
        delete ride.region;
        delete ride.revision;
        delete ride.rideType;
        res.send(ride);
      }
      else {
        var rideTypes = response.body.rideTypes;
        var drivers;
        var pricing;
        for (var x = 0; x < rideTypes.length; x++) {
          if (rideTypes[x].id === 'standard') {
            drivers = rideTypes[x].drivers;
            pricing = rideTypes[x].pricing;
          }
        }
        for (var x = 0; x < drivers.length; x++) {
          drivers[x].lat = drivers[x].location.lat.toString();
          drivers[x].lng = drivers[x].location.lng.toString();
          delete drivers[x].location;
          drivers[x].which = 'lyft';
          drivers[x].pricing = pricing;
          drivers[x].name = 'Lyft Driver';
        }
        res.send(drivers);
      }
    });
}
