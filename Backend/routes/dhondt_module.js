var dhondt = require('dhondt');
var _ = require('./dhondt_module.js');
exports.dhondtFunction = function (votos, diputados, partidos,options) {
    var resultados = undefined;
    if(partidos === undefined){
        resultados = dhondt.compute(votos,diputados);
    }else if(votos === undefined){
        resultados = dhondt.compute(partidos,diputados,options);
    }
    return resultados;
};

exports.dhondtExample = function (req,res) {
    var votos = [150000,125000,115000,90000,50000,800];
    var totalVotos = 0;
    var size = votos.length;
    var i;
    for(i=0; i < size; i++) totalVotos += votos[i];

    var diputados = 10;
    var partidos = [
        { partido:'A', votos: 150000 },
        { partido:'B', votos: 125000 },
        { partido:'C', votos: 115000 },
        { partido:'D', votos: 90000 },
        { partido:'E', votos: 50000 },
        { partido:'F', votos: 800 }
    ];
    var options = {
        voteAccessor: function (object) {
            return object.votos
        },
        resultProperty: "diputados",
        base: 1.42
    };
    var r1 = _.dhondtFunction(votos,diputados,undefined,undefined);
    var r2 = _.dhondtFunction(undefined,diputados,partidos,options);

    var salida = r2;
    var entrada = [diputados, partidos, options];


    res.render('index', {
        title: 'D\'hondt Example',
        modo: 'dhondt',
        entrada: entrada,
        salida: r2
    });
};