'use strict';
const fs = require('fs');
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

    /**
     *
     * @param path1{String} Ruta del fichero csv con la provincia, votos, etc ...
     * @param path2{String} Ruta del fichero csv con los partidos agrupados
     * @param done{Function} Función callback
     */
    static readCsv(path1,path2,done){
        var csv = require('fast-csv');
        var stream = fs.createReadStream(path1);
        var resultados = [];
        csv.fromStream(stream,{
            headers : true
        }).on('data', function(data){
            resultados.push(data);
        }).on('end', function(){
            readParties();
        });
        function readParties(){
            var i = 0;
            stream = fs.createReadStream(path2);
            csv.fromStream(stream,{
                headers: true
            }).on('data', function(partidos){
                resultados[i].partidos = partidos;
                i++;
            }).on('end', function(){
                done(resultados);
            });
        }
    }
}
module.exports = UtilsObject;