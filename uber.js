var exports = module.exports = {};
var uberClient = require('node-uber');
var config = require('./config');
var OAuth = require('oauth');
var request = require('request');
//
// var uber = new uberClient({
//   client_id: config.uber_client_id,
//   client_secret: config.uber_client_secret,
//   server_token: config.uber_server_token,
//   redirect_uri: config.uber_redirect_uri,
//   name: config.uber_app_name
// });

// curl -H 'Authorization: Token YOUR_SERVER_TOKEN' \
// 'https://api.uber.com/v1/products?latitude=37.7759792&longitude=-122.41823'


var uberAPIUrl = "https://api.uber.com/";
var authURL = 'https://login.uber.com/oauth/v2/authorize';
var tokenURL = "https://login.uber.com/oauth/v2/token";

var OAuth2 = OAuth.OAuth2;
// var oauth2 = new OAuth2(config.uber_client_id, config.uber_client_secret, uberAPIUrl, authURL, tokenURL);
var oauth2 = new OAuth2(config.uber_client_id, config.uber_client_secret, '', authURL, tokenURL);


console.log(oauth2.getAuthorizeUrl({'response_type': 'code',
'redirect_uri': config.uber_redirect_uri,
'scope': 'request'
})
);

exports.UberRequest = function (req, res) {
  var options = {
    'url': 'https://api.uber.com/v1/requests',
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + YOUR_ACCESS_TOKEN
    },
    'json': {
      'product_id': PROD_ID,
      'start_latitude': START_LAT,
      'start_longitude': START_LONG,
      'end_latitude': END_LAT,
      'end_longitude': END_LONG
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
