var request = require('request');

var APIKEY = process.env.GMAPSKEY;
var directionsUrl = 'https://maps.googleapis.com/maps/api/directions/json?key=' + APIKEY;

function getDuration(req, res) {
	var origin = req.query.origin;
	var destination = req.query.destination;
	var options = {
		url: directionsUrl + '&origin=' + origin + '&destination=' + destination
	};
	request(options, function(err, response, body) {
		res.json({duration: body})
	});
}


module.exports = {
	getDuration
}