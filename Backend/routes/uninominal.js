var _ = require('./uninominal.js');
exports.uninominalFunction = function (distritos) {
    var num_distritos = distritos.length;
    var i;
    var ganadores = [];
    for(i = 0; i < num_distritos; i++){
        ganadores.push(_.ganador(distritos[i]));
    }
    return ganadores;
};

exports.ganador = function(distrito){
    var ganador = undefined;
    var i;
    for(i=0; i < distrito.length; i++){
        if(ganador === undefined) {
            ganador = distrito[0];
        } else {
            if(distrito[i].votos > ganador.votos){
                console.log(distrito[i].votos, ganador.votos);
                ganador = distrito[i];
            }
        }
    }
    return ganador;
};


exports.uninominalExample = function (req,res) {
    var distrito1 = [
        {
            candidato: 'Juan',
            votos: 200
        },
        {
            candidato: 'JuanDeDios',
            votos: 210
        }
    ];
    var distrito2 = [
        {
            candidato: 'Juan Carlos',
            votos: 1220
        },
        {
            candidato: 'Miguel',
            votos: 1200
        }
    ];
    var distrito3 = [
        {
            candidato: 'Pepe',
            votos: 180
        },
        {
            candidato: 'Juan Miguel',
            votos: 200
        }
    ];

    var distritos = [
        distrito1,
        distrito2,
        distrito3
    ];

    var ganadores = _.uninominalFunction(distritos);
    console.log(distritos, ganadores);

    res.render('index', {
        title: 'UninominalExample'
    });
};