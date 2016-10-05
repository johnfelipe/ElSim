'use strict';
var _ = require('./utils_module.js');
var DbManager = require('./dbmanager_module.js');
var Sistema = require('./sistema');
/**
 * Clase para gestionar objetos de tipo Hare
 * @returns {HareObject}
 * @constructor
 */
class HareObject extends Sistema{
    constructor(){
        super([],0,[]);
        this.done = false;
        this.cociente = 0;
    }
    /**
     * Fija el número de escaños.
     * @param {number} n
     */
    setEscanios(n){
        if(n > 2) {
            this.diputados = n;
            this.done = false;
        }
    }

    /**
     * Fija el array de partidos y sus votos.
     * @param {Array} p
     */
    setPartidos(p){
        this.partidos = [];
        this.partidos = p;
        this.setCociente();
        this.done = false;
    }

    /**
     * Calcula el cociente a utilizar.
     */
    setCociente(){
        if(this.partidos.length > 1 && this.diputados ){
            this.cociente = Math.floor(this.totalVotos() / this.diputados);
        }
    }

    /**
     * Calcula el total de votos.
     * @returns {number}
     */
    totalVotos(){
        var t = 0;
        for(var i=0, size = this.partidos.length; i < size; i++){
            t += this.partidos[i].votos;
        }
        return t;
    }

    /**
     * LLama a las funciones necesarias para calcular los resultados
     * de cada partido.
     */
    compute(){
        if(this.partidos.length > 1 && this.diputados > 0 && this.cociente > 0) {
            this.rest();
            this.overRest();
            this.done = true;
        }

    }

    /**
     * Fija los resultados de cada partido a falta de comprobar si
     * sobran escaños que serán posteriormente repartidos.
     */
    rest(){
        for(var i=0, size = this.partidos.length; i < size; i++){
            this.partidos[i].totalEscanios = Math.floor(this.partidos[i].votos / this.cociente);
            this.partidos[i].rest = this.partidos[i].votos % this.cociente;
        }

    }

    /**
     * Fija los resultados definitivos de cada partido.
     */
    overRest(){
        var difference, i, size, totalEscanios = 0;
        for(i=0, size = this.partidos.length; i < size; i++){
            totalEscanios += this.partidos[i].totalEscanios;
        }
        difference = this.diputados - totalEscanios;

        this.partidos.sort(_.sortByKey);
        i = 0;
        while(difference){
            i < this.partidos.length ? i++ : i = 0;
            this.partidos[i].totalEscanios++;
            difference--;
        }
    }


    /**
     * Inicializa unos valores de ejemplo.
     */
    initExample (){
        var array =  [
            { partido: 'A', votos:391000 },
            { partido: 'B', votos:311000 },
            { partido: 'C', votos:184000 },
            { partido: 'D', votos: 73000 },
            { partido: 'E', votos: 27000 },
            { partido: 'F', votos: 12000 },
            { partido: 'G', votos:  2000 }
        ];
        this.setPartidos(array);
        this.setEscanios(21);
        this.setCociente();
    }
}
module.exports = HareObject;
