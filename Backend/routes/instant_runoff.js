var _ = require('./instant_runoff.js');
// Al realizarse el escrutinio, inicialmente se cuentan solo las primeras preferencias
// de los votantes. Si un candidato obtiene entonces más de la mitad de los votos
// (es decir, mayoría absoluta), ese candidato es proclamado vencedor. Si por el
// contrario ningún candidato ha obtenido mayoría absoluta, se produce entonces la segunda
// vuelta instantánea: se elimina al candidato con menos apoyos y se recuentan sus votos,
//     pero asignándose ahora a las segundas preferencias marcadas en esas papeletas.
//     Este proceso se repite hasta que un candidato gane obteniendo la mayoría absoluta
// de los votos.

exports.instantRunoffFunction = function (votos = []) {
    var firstRound = _.getFirstEachFunction(votos);
    firstRound = _.countOcurrences(firstRound);
    var canWin = _.canWin(firstRound[1],votos.length);
    if(canWin){
        console.log('SE HA FINALIZADO EN LA PRIMERA RONDA');
    }else{
        console.log('NO SE OBTUVO AÚN UN GANADOR');
        votos = _.deleteLowest(votos);
    }
    return canWin;
};

exports.deleteLowest = function(votos){

};


exports.canWin = function(candidatos, total){
    var i;
    for(i = 0; i < candidatos.length; i++){
        if(candidatos[i] > (total/2)) {
            return i;
        }
    }
    return false;
};
exports.countOcurrences = function (arr){
    var a = [], b = [], prev;
    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i];
    }
    return [a, b];
};

exports.getFirstEachFunction = function (array){
    var primeros = [];
    var i;
    for (i = 0; i < array.length; i++){
        primeros.push(array[i][0]);
    }
    return primeros;
};
exports.instantRunoffExample = function (req,res) {
    var entrada = '';
    var salida = '';
    votos = [
        ['a','b','c'],
        ['b','a','c'],
        ['c','b','a'],
        ['c','b','a'],
        ['a','b','c'],
        ['a','b','c']
    ];
    salida = _.instantRunoffFunction(votos);
    res.render('index', {
        title: 'Instant-Runoff Example',
        modo: 'instant',
        entrada: votos,
        salida: salida
    });
};