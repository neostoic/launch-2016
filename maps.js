var exports = module.exports = {};
var GoogleMaps = require('googlemaps');
var config = require('./config.json');
var gm_API_KEY = config.maps_api_key;
var publicConfig = {
  key: gm_API_KEY,
  stagger_time:       1000,
  encode_polylines:   false,
  secure:             true,
};
var gmAPI = new GoogleMaps(publicConfig);

exports.getDirections = function(origin, destination) {
  gmAPI.directions({origin:origin.long+","+origin.lat, destination:destination.long+','+destination.lat},
    function(err, data) {
    console.log(JSON.stringify(data));
  });
}

exports.getStaticMap = function(origin, destination) {
  var params = {
    center: origin.long+","+origin.lat
    zoom: 15,
    size: '500x400',
    maptype: 'roadmap',
    markers: [
      {
        location: destination.long+','+destination.lat,
        color   : 'green',
        shadow  : true
      },
      {
        location: origin.long+","+origin.lat,
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
  gmAPI.staticMap(params, function(err, binaryImage) {
    console.log(binaryImage);
  });
}
