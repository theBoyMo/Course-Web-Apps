'use strict';
const _ = require('underscore');
const model = require('./../models/badge');

// send badges to the model - has the responsibilty of saving the badges
const save = (req, res, next)=>{
	// create a copy of the req.body obj so we don't mutate it
	const badges = _.clone(req.body); // clone() method returns a deep copy of the obj
	// pass the badges array to the model to save to the redis database, returning an error if one occurs
	model.save(badges, (err, data)=>{
		if(err) return res.send(503, err);
		next();
	});
};

// send badges to the pub/sub socket in the model
const send = (req, res, next)=>{
	const badges = _.clone(req.body);
	model.send(badges, (err)=>{
		if(err) return res.send(503, err);
		res.send(200, 'success');
	});
};

// trim the badges
const trim = (req, res, next)=>{
	model.trim();
	next();
};

// get badges from model
const get = (req, res)=>{
	model.get((err, data)=>{
		if(err) return res.send(503, err);
		res.json(200, data);
	});
};


module.exports = {
	save,
	send,
	trim,
	get
};