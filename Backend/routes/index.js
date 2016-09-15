var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});


router.get('/dhondt',dhondtFunction);

function dhondtFunction(req,res,next) {
	var dhondt = require ('dhondt')
	var votes = [100000, 80000, 30000, 20000];
	var mandates = 8;
	var results = dhondt.compute(votes, mandates);
	console.log(results);

	var parties = [
	{
		party: "A", 
		votes: 100
	},
	{
		party: "B", 
		votes:  60
	},
	{
		party: "C", 
		votes:  45
	}
	];
	var mandates = 2;
	options = {
		voteAccessor: function(object) {return object.votes},
		resultProperty: "mandates",
		base: 1.42
	}
	var results = dhondt.compute(parties, mandates, options);
	console.log(results);
	res.render('index', { title: 'Dhondt' });
};


module.exports = router;
