var exports = module.exports = {};
var _ = require('underscore');
var request = require('request');
var querystring = require('querystring');
var config = require('./config.json');


request.post({
  url: 'http://localhost:8080',
  data: {"grant_type": "client_credentials",
          "scope": "public"
        },
  user: config.lyft_client_id+":"+config.lyft_client_secret,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }}, function (err, response) {
    if (err) throw err;
    console.log(response.body);
  });
