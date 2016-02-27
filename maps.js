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
//
var params = {
  location: '51.507868,-0.087689',
  size: '1200x1600',
  heading: 108.4,
  pitch: 7,
  fov: 40
};
// var result = gmAPI.streetView(params);
// console.log(result);
gmAPI.directions({origin:'31.470656,74.412929', destination:'31.470789,74.408619'},
  function(err, data) {
  console.log(JSON.stringify(data));
});

var params = {
  center: '444 W Main St Lock Haven PA',
  zoom: 15,
  size: '500x400',
  maptype: 'roadmap',
  markers: [
    {
      location: '300 W Main St Lock Haven, PA',
      label   : 'A',
      color   : 'green',
      shadow  : true
    },
    {
      location: '444 W Main St Lock Haven, PA',
      icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=cafe%7C996600'
    }
  ],
  style: [
    {
      feature: 'road',
      element: 'all',
      rules: {
        hue: '0x00ff00'
      }
    }
  ],
  path: [
    {
      color: '0x0000ff',
      weight: '5',
      points: [
        '41.139817,-77.454439',
        '41.138621,-77.451596'
      ]
    }
  ]
};
gmAPI.staticMap(params); // return static map URL
gmAPI.staticMap(params, function(err, binaryImage) {
  console.log(binaryImage);
});
//
// var gm = require('googlemaps');
// var util = require('util');
//
// gm.config('key', gm_API_KEY);
// gm.directions('31.470656,74.412929', '31.470789,74.408619' ,
// function(err, data){util.puts(JSON.stringify(data));});
