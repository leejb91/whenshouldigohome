require('dotenv').config();

var APIKEY = process.env.APIKEY;
var directionsUrl = 'https://maps.googleapis.com/maps/api/directions/';

function hello(req, res) {
	res.json({message: APIKEY})
}


module.exports = {
	hello
}