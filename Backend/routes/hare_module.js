/**
 *
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
        if(this.partidos.length > 1 && this.escanios > 0){
            var total = this.totalVotos();
            this.cociente = Math.floor(total / this.escanios);
        }
    };

    /**
     * Calcula el total de votos.
     * @returns {number}
     */
    this.totalVotos = function(){
        var t = 0;
        for(var i=0; i<this.partidos.length; i++){
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
        var i;
        for(i=0; i<this.partidos.length; i++){
            this.partidos[i].totalEscanios = this.partidos[i].withoutRest;
        }
        this.partidos.sort(function(a, b){
            var keyA = a.withoutRest,
                keyB = b.withoutRest;
            if(keyA > keyB) return -1;
            if(keyA < keyB) return 1;
            return 0;
        });
        i = 0;
        while(difference){
            if(i < this.partidos.length){
                i++;
            }else{
                i = 0;
            }
            this.partidos[i].totalEscanios++;
            difference--;
        }
    };

    /**
     * Inicializa unos valores de ejemplo.
     */
    this.initExample = function(){
        var array =  [
            {partido: 'A', votos:32500},
            {partido: 'B', votos:24000},
            {partido: 'C', votos:18000},
            {partido: 'D', votos:12000},
            {partido: 'E', votos:10000},
            {partido: 'F', votos:2000}
        ];
        this.setPartidos(array);
        this.setEscanios(10);
        this.setCociente();
    };

    return this;
};
module.exports = HareObject;