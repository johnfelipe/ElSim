/**
 * Clase para manejar objetos basados en el método Hare.
 * @returns {HareObject}
 * @constructor
 */
var HareObject = function(){

    this.partidos = [];
    this.done = false;
    this.escanios = 0;
    this.cociente = 0;
    /**
     * Fija el número de escaños.
     * @param {number} n
     */
    this.setEscanios = function(n){
        if(n > 2) {
            this.escanios = n;
            this.done = false;
        }
    };

    /**
     * Fija el array de partidos y sus votos.
     * @param {Array} p
     */
    this.setPartidos = function(p){
        this.partidos = [];
        this.partidos = p;
        this.setCociente();
        this.done = false;
    };

    /**
     * Calcula el cociente a utilizar.
     */
    this.setCociente = function(){
        if(this.partidos.length > 1 && this.escanios ){
            this.cociente = Math.floor(this.totalVotos() / this.escanios);
        }
    };

    /**
     * Calcula el total de votos.
     * @returns {number}
     */
    this.totalVotos = function(){
        var t = 0;
        for(var i=0, size = this.partidos.length; i < size; i++){
            t += this.partidos[i].votos;
        }
        return t;
    };

    /**
     * LLama a las funciones necesarias para calcular los resultados
     * de cada partido.
     */
    this.compute = function(){
        if(this.partidos.length > 1 && this.escanios > 0 && this.cociente > 0) {
            this.rest();
            this.overRest();
            this.done = true;
        }

    };

    /**
     * Fija los resultados de cada partido a falta de comprobar si
     * sobran escaños que serán posteriormente repartidos.
     */
    this.rest = function(){
        for(var i=0, size = this.partidos.length; i < size; i++){
            this.partidos[i].totalEscanios = Math.floor(this.partidos[i].votos / this.cociente);
            this.partidos[i].rest = this.partidos[i].votos % this.cociente;
        }

    };

    /**
     * Fija los resultados definitivos de cada partido.
     */
    this.overRest = function(){
        var difference, i, size, totalEscanios = 0;
        for(i=0, size = this.partidos.length; i < size; i++){
            totalEscanios += this.partidos[i].totalEscanios;
        }
        difference = this.escanios - totalEscanios;

        this.partidos.sort(this.sortByKey);
        i = 0;
        while(difference){
            i < this.partidos.length ? i++ : i = 0;
            this.partidos[i].totalEscanios++;
            difference--;
        }
    };
    /**
     *
     * @param a
     * @param b
     * @returns {number}
     */
    this.sortByKey = function(a, b){
        var keyA = a.rest,
            keyB = b.rest;
        if(keyA > keyB) { return -1; }
        if(keyA < keyB) { return 1; }
        return 0;
    };

    /**
     * Inicializa unos valores de ejemplo.
     */
    this.initExample = function(){
        var array =  [
            {
                partido: 'A',
                votos:391000
            }, {
                partido: 'B',
                votos:311000
            }, {
                partido: 'C',
                votos:184000
            }, {
                partido: 'D',
                votos:73000
            }, {
                partido: 'E',
                votos:27000
            }, {
                partido: 'F',
                votos:12000
            }, {
                partido: 'G',
                votos:2000
            }
        ];
        this.setPartidos(array);
        this.setEscanios(21);
        this.setCociente();
    };

    return this;
};
module.exports = HareObject;