var exports = module.exports = {};
var config = require('./config');
var request = require('request');

exports.PriceEstimate = function(origin, destination) {
  var cb = function(err, res, body) {
    if (err) throw err;
    console.log(res);
  }
  var options = {
    'url': 'https://api.uber.com/v1/estimates/price',
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    },
    'json': {
      'start_latitude': origin.lat,
      'start_longitude': origin.long,
      'end_latitude': destination.lat,
      'end_longitude': destination.long
    }
  }
  request.post(options, cb);
}

exports.TimeEstimate = function(origin) {
  var cb = function(err, res, body) {
    if (err) throw err;
    console.log(res);
  }
  var options = {
    'url': 'https://api.uber.com/v1/estimates/time',
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    },
    'json': {
      'start_latitude': origin.lat,
      'start_longitude': origin.long,
    }
  }
  request.post(options, cb);

}

exports.UberRequest = function (access_token, origin, destination) {
  var cb = function(err, res, body) {
    if (err) throw err;
    console.log(res);
  }
  var options = {
    'url': 'https://api.uber.com/v1/requests',
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    },
    'json': {
      'start_latitude': origin.lat,
      'start_longitude': origin.long,
      'end_latitude': destination.lat,
      'end_longitude': destination.long
    }
  }
  request.post(options, cb);
}

//get authorization_code (from redirect uri)
// oauth2.getOAuthAccessToken(null, {
//   client_id: config.uber_client_id,
//   client_secret: config.uber_client_secret,
//   redirect_uri: config.uber_redirect_uri,
//   grant_type: 'authorization_code'
// }, function (err, access_token, refresh_token) {
//     if (err) {
//       callback(err);
//     } else {
//       var access_token = access_token;
//       var refresh_token = refresh_token;
//       callback(null, access_token, refresh_token);
//     }
//   });
/*
response_type: code
client_id


/*
Auth
Auth refresh
Price estimate
Time estimate
Ride order
Ride cancel
Ongoing info

Google Directions
// */
//
// uber.getAuthorizeUrl(['profile']);
// uber.authorization({ authorization_code: 'AUTHORIZATION_CODE' },
//   function (err, accessToken, refreshToken) {
//     uberClient.user.profile(accessToken, function (err, res) {
//       console.log(err);
//       console.log(res);
//   });
// });
//
//
//
//
// uber.estimates.price({
//   start_latitude: 3.1357, start_longitude: 101.6880,
//   end_latitude: 3.0833, end_longitude: 101.6500
// }, function (err, res) {
//   if (err) console.error(err);
//   else console.log(res);
// });
//
// uber.estimates.time({
//   start_latitude: 3.1357, start_longitude: 101.6880
// }, function (err, res) {
//   if (err) console.error(err);
//   else console.log(res);
// });
//
// // uber.products.requestRide()
