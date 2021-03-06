/*
	problem: need a simple way to display the user's badge count and javascript score in a web page
	solution: Use node to fetch the user's profile info and server our template files via http

	1. create a web server
	
	2. handle http route GET / and POST / i.e Home
		if url == '/' && GET => show search
		if url == '/' && POST => redirect to /:username
		
	3. handle http route GET /:username, ie home/[username]
		if url == '/.....' => get json from treehouse
			on 'end' => show profile
			on 'error' => show error message
			
	4. function that handles the reading of files and merge in value
		read from file and get a string
		merge values into string
	
	note: killing processes
	1. find the process
		$ ps -aux
	2. kill it
		$ kill -9 [process id]
		
	GET - encodes content as a query string at the end of the url, sent in plain text
	POST - encodes content and sends it as part of the requests body
	
	References:
	[1] https://medium.com/@MatHelme/the-four-ps-of-problem-solving-6e15a39a0712
	[2] https://nodejs.org/api/http.html#http_http_createserver_requestlistener
	[3] https://nodejs.org/api/http.html#http_response_writehead_statuscode_statusmessage_headers
	[4] https://nodejs.org/api/http.html#http_response_write_chunk_encoding_callback
	[5] https://nodejs.org/api/http.html#http_response_end_data_encoding_callback
	[6] https://nodejs.org/api/timers.html#timers_setinterval_callback_delay_arg
	[7] https://www.iana.org/assignments/media-types/media-types.xhtml (list of content types)
	[8] https://nodejs.org/api/querystring.html#querystring_querystring_parse_str_sep_eq_options
	[9] https://nodejs.org/api/http.html#http_response_writehead_statuscode_statusmessage_headers
	
*/
/*
	TODO - extract css into a styles sheet and use node to serve static files (also images and client side js files)
	TODO - build a Lorem ipsum generator
			- include a web form so users can specify number of words, paragraphs
			- write the response to a template
			- example http://www.lipsum.com/
*/
'use strict';
const http = require('http');
const router = require('./router.js');

const $port = 3000;

// create the web server
http.createServer((req, res)=>{
	router.home(req, res);
	router.user(req, res);
}).listen($port, '127.0.0.1');
console.log(`Web server running on http://127.0.0.1:${$port}/`);

