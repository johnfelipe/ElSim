'use strict';
var fs = require('fs');
/**
 * Módulo de utilidades usado por otros módulos.
 * @returns {UtilsObject}
 * @constructor
 */
class UtilsObject{
    constructor(){

    }
    /**
     * Salida a consola con colores e indentación.
     * @param message{String}
     */
    static prettyPrint (message){
        var options = {
            depth: 2,
            colors: true
        };
        console.dir(message,options);
    }
    /**
     * Dado un array con elementos repetidos establece como
     * claves cada elemento y como valor de cada clave el número
     * de repeticiones de dicha clave en el array.
     * [a,a,a,b,c,c] --> {a:3, b:1, c:2}
     * @param array{Array}
     */
    static groupByKey (array){
        var counts = {};
        for (var i = 0, len = array.length; i < len; ++i) {
            counts[array[i]] = 1 + (counts[array[i]] || 0);
        }
        return counts;
    }

    /**
     *
     * @param a
     * @param b
     * @returns {number}
     */
    static sortByKey(a, b){
        var keyA = a.rest,
            keyB = b.rest;
        if(keyA > keyB) { return -1; }
        if(keyA < keyB) { return 1; }
        return 0;
    }

    static readCsv(){
        var csv = require('fast-csv');
        var stream = fs.createReadStream('./TEST.csv');
        var resultado = false;
        csv.fromStream(stream,{
            headers :
                [
                    'comunidad','cod_provincia','provincia','poblacion',
                    'num_mesas','total_censo_electoral','total_votantes',
                    'votos_validos','votos_candidaturas','votos_blanco',
                    'votos_nulos'
                ]
        }).on('data', function(data){
            UtilsObject.prettyPrint(data);
            fin(data);
        }).on('end', function(){
            UtilsObject.prettyPrint('done');
        });
        function fin(data){
            resultado = data;
        }
        while(!resultado){UtilsObject.prettyPrint('processing...')}
        return resultado;
    }
}
module.exports = UtilsObject;