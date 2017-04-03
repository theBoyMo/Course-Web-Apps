const https = require('https');
const api = require('./api.json');

// Print out temp details
// Print out error message

function getForcast(query) {
	const request = https.get(`https://api.wunderground.com/api/${api.key}/geolookup/conditions/q/${query}.json`, (response) => {
		let body = "";
		// Read the data
		response.on('data', chunk => {
			body += chunk;
		});
		response.on('end', () => {
			console.log(body);
			//Parse data
			//Print the data
		});
	});
}

module.exports.get = getForcast;

//TODO: Handle any errors