var request = require('request');
var fs = require('fs');

var APIKEY = process.env.GMAPSKEY;
var directionsUrl = 'https://maps.googleapis.com/maps/api/directions/json?key=' + APIKEY;

function getDuration(req, res) {
	var origin = req.query.origin;
	var destination = req.query.destination;
	var options = {
		url: directionsUrl + '&origin=' + origin + '&destination=' + destination
	};
	request(options, function(err, response, body) {
		body = JSON.parse(body);
		res.json({duration: body.routes[0].legs[0].duration.text})
	});
}

function whenShallIGoHome() {
	var MYHOUSE = process.env.MYHOUSE;
	var WORK = process.env.WORK;
	options = {
		url: directionsUrl + '&origin=' + WORK + '&destination=' + MYHOUSE
	}
	request(options, function(err, response, body) {
		body = JSON.parse(body);
		console.log(options.url)
		if (body.status === 'NOT_FOUND') return console.log('not found');
		var duration = body.routes[0].legs[0].duration.text;
		var date = new Date();
		var day = getDay(date.getDay());
		var time = getTime(date);
		fs.appendFile('home.txt', `${day} ${time} - ${duration} \n`, function(err) {
			if (err) throw err;
		});
	});
}

module.exports = {
	getDuration
}

whenShallIGoHome();

setInterval(function() {whenShallIGoHome()}, 300000);

// extra
function getDay(number) {
	switch (number) {
		case 0:
			return 'Sunday';
		case 1:
			return 'Monday';
		case 2:
			return 'Tuesday';
		case 3:
			return 'Wednesday';
		case 4:
			return 'Thursday';
		case 5:
			return 'Friday';
		case 6:
			return 'Saturday';
	};
}

function getTime(date) {
	var isPM = date.getHours() >= 12;
	var isMidday = date.getHours() == 12;
	return [date.getHours() - (isPM && !isMidday ? 12 : 0), 
            date.getMinutes()].join(':') +
           (isPM ? ' pm' : 'am');
}