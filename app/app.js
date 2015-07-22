// include the libraries we need
var express = require('express');
var bodyParser = require('body-parser')
var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var app = express();

// set some defaults
reqs = request.defaults({
	//jar: true,                 // save cookies to jar
	//rejectUnauthorized: false, 
	//followAllRedirects: true   // allow redirections
});


app.use(bodyParser());

app.use(express.static(__dirname + '/'));

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname+'/index.html'));
});

app.post('/getsitedata', function (req, res){
	
	console.log(req.body.url);
	
	// scrape the page
	reqs.get({
		url: req.body.url,
		headers: {
			'User-Agent': 'Super Cool Browser' // optional headers
		}}, function(err, resp, body) {
		
		// load the html into cheerio
		var $ = cheerio.load(body);
		res.send({name : "Good", data : $(req.body.selector).html()});
		// get the data and output to console
		//console.log( 'IP: ' + $('#article').text() );	
	}); 
	
});

app.listen('8081');

console.log('Magic happens on port 8081');