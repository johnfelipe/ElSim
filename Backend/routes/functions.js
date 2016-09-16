var _ = require('./functions.js');
/*
 *
 *	@votos is an array of how many votos each party has received or an array of object
 *	if you specify options.voteAccessor function (see examples)
 *	@diputados is an integer, how many diputados are being allocated
 *	@options object can have following properties:
 *		voteAccessor: function returning the number of votos from an object
 *		resultProperty: if array of objects is passed, specifies which property
 *						of the object should house the result. If not specified,
 *						array of diputados is returned.
 *		base: Specifies the base divider used in first round of mandate allocation.
 *			  Sometimes 1.42 is used to favor large partidos is smaller districts.
 */
 exports.dhondtFunction = function (votos, diputados, partidos,options) {
 	var dhondt = require ('dhondt');
 	var resultados = undefined;
 	if(partidos === undefined){
 		resultados = dhondt.compute(votos,diputados);
 	}else if(votos === undefined){
 		resultados = dhondt.compute(partidos,diputados,options);
 	}
 	return resultados;
 };

 exports.dhondtExample = function (req,res,next) {
 	var votos = [150000,125000,115000,90000,50000,800];
 	var totalVotos = 0;
 	var size = votos.length;
 	for(var i=0; i < size; i++){
 		totalVotos += votos[i];
 	}

 	//votos = _.rellenaArrayEnteros();
 	var diputados = 10;
 	var partidos = [
 	{ partido:'A', votos: 150000 },
 	{ partido:'B', votos: 125000 },
 	{ partido:'C', votos: 115000 },
 	{ partido:'D', votos: 90000 },
 	{ partido:'E', votos: 50000 },
 	{ partido:'F', votos: 800 }
 	];
 	options = {
 		voteAccessor: function(object) {return object.votos},
 		resultProperty: "diputados",
 		base: 1.42
 	}
 	var r1 = _.dhondtFunction(votos,diputados,undefined,undefined);
 	var r2 = _.dhondtFunction(undefined,diputados,partidos,options);
 	res.render('index', {
 		title: 'DhondtExample',
 		totalDiputados: diputados,
 		totalVotos: totalVotos,
 		result1: r1,
 		result2: r2
 	});
 };

 exports.index = function(req, res, next) {
 	res.render('index',{
 		title: 'Express'
 	});
 };