var exports = module.exports = {};
var Foursquare = require('foursquareVenues');
var config = require('./config.json');
var foursquare = new Foursquare(config.fs_client_id, config.fs_client_secret);

exports.Venues = function (location) {
  foursquare.getVenues({ near: location }, function(error, response) {
    if (error) { return console.error(error) }
    console.log(response.response);
  });
}

exports.Explore = function (location) {
  foursquare.exploreVenues({ near: location }, function(error, response) {
    if (error) { return console.error(error) }
    console.log(response.response);
  });
}
