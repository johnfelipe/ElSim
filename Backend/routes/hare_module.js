/**
 *
 * @returns {HareObject}
 * @constructor
 */
var HareObject = function(){

    /*  Partido A  391.000 votos
     *  Partido B  311.000 votos
     *  Partido C  184.000 votos
     *  Partido D	73.000 votos
     *  Partido E	27.000 votos
     *  Partido F	12.000 votos
     *  Partido G	 2.000 votos
     */
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
        if(this.partidos.length > 1 && this.escanios > 0){
            var total = 0;
            for(var i=0; i<this.partidos.length; i++){
                total += this.partidos[i].votos;
            }
            this.cociente = Math.floor(total / this.escanios);
        }
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
        for(var i=0; i<this.partidos.length; i++){
            this.partidos[i].withoutRest = Math.floor(this.partidos[i].votos / this.cociente);
            this.partidos[i].rest = this.partidos[i].votos % this.cociente;
        }

    };

    /**
     * Fija los resultados definitivos de cada partido.
     */
    this.overRest = function(){
        var totalEscanios = 0;
        for(var i=0; i<this.partidos.length; i++){
            totalEscanios += this.partidos[i].withoutRest;
        }
        var difference = this.escanios - totalEscanios;
        if(difference === 0){
            for(var i=0; i<this.partidos.length; i++){
                this.partidos[i].totalEscanios = this.partidos[i].withoutRest;
            }
        } else {

        }
    };

    return this;
};
module.exports = HareObject;