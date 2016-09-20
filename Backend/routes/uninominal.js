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

exports.uninominalRoute = function (req, res) {
    var resultados = _.uninominalFunction(req.body.entrada);
    console.log(resultados);
    res.send(resultados);
};

exports.uninominalExample = function (req,res) {
    var distrito1 = [
        {
            distrito: '01',
            candidato: 'Juan',
            votos: 200
        },
        {
            distrito: '01',
            candidato: 'John',
            votos: 219
        },
        {
            distrito: '01',
            candidato: 'Juan de Dios',
            votos: 210
        }
    ];
    var distrito2 = [
        {
            distrito: '02',
            candidato: 'Juan Carlos',
            votos: 1220
        },
        {
            distrito: '02',
            candidato: 'Miguel',
            votos: 1200
        }
    ];
    var distrito3 = [
        {
            distrito: '03',
            candidato: 'Pepe',
            votos: 180
        },
        {
            distrito: '03',
            candidato: 'Juan Miguel',
            votos: 200
        },
        {
            distrito: '03',
            candidato: 'Eufrasia',
            votos: 300
        },
        {
            distrito: '03',
            candidato: 'María Angustias',
            votos: 100
        }
    ];

    var distritos = [
        distrito1,
        distrito2,
        distrito3
    ];

    var ganadores = _.uninominalFunction(distritos);


    res.render('index', {
        title: 'First Past The Post Example',
        modo: 'uninominal',
        entrada: distritos,
        salida: ganadores
    });
};