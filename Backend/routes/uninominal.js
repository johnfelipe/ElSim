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
    var ganador = undefined, i;
    var distrito_size = distrito.length;
    for(i=0; i < distrito_size; i++){
        if(ganador === undefined) {
            ganador = distrito[0];
        } else {
            if(distrito[i].votos > ganador.votos){
                ganador = distrito[i];
            }
        }
    }
    return ganador;
};

exports.uninominalRoute = function (req, res) {
    var resultados = _.uninominalFunction(req.body.entrada);
    res.send(resultados);
};

exports.uninominalExample = function (req,res) {
    var nombres = [
        'Maryellen', 'Salvador', 'Kristopher', 'Sherie',
        'Aileen', 'Missy', 'Margarett','Maribeth',
        'Celinda','Edna','Karena', 'Charis','Sabine',
        'Eda','Lien', 'Duane', 'Hoyt', 'Cicely',
        'Josiah', 'Katharina', 'Vanesa', 'Agripina',
        'Torie', 'Holly', 'Jarod', 'Roma',
        'Adina', 'Sherrie', 'Margorie', 'Eleanore',
        'Herb', 'Lyndia', 'Beatris', 'Kari',
        'Angle', 'Thelma', 'Constance', 'Benny',
        'Kacey', 'Lili', 'Stephnie', 'Adolfo',
        'Tamica', 'Rudolf', 'Jarvis', 'Sage',
        'Mitsuko', 'Frederica', 'Madison', 'Loren'
    ];
    var i, j,nombre,num_votos,object;
    var distritos = [],distrito1 = [],distrito2 = [],distrito3 = [],distrito4 = [],distrito5 = [];
    for(i = 0; i < nombres.length; i++) {
        nombre = nombres[i];
        num_votos = Math.floor((Math.random() * 10000) + 1);
        object = {
            distrito: undefined,
            candidato: nombre,
            votos: num_votos
        };
        if (i < 10) {
            object.distrito = '01';
            distrito1.push(object);
        }
        if (i >= 10 && i < 20) {
            object.distrito = '02';
            distrito2.push(object);
        }
        if (i >= 20 && i < 30){
            object.distrito = '03';
            distrito3.push(object);
        }
        if( i>=30 && i<40) {
            object.distrito = '04';
            distrito4.push(object);
        }
        if(i>=40) {
            object.distrito = '05';
            distrito5.push(object);
        }
    }
    distritos = [distrito1,distrito2,distrito3,distrito4,distrito5];

    var ganadores = _.uninominalFunction(distritos);


    res.render('index', {
        title: 'First Past The Post Example',
        modo: 'uninominal',
        entrada: distritos,
        salida: ganadores
    });
};