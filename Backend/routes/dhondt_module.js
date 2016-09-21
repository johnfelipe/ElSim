/**
 *
 * @returns {DhondtObject}
 * @constructor
 */
var DhondtObject = function(){
    this.dhondt = require('dhondt');
    this.votos = [];
    this.diputados = 8;
    this.partidos = [];
    this.options = {};
    this.resultados = [];
    this.done = false;

    /**
     * Fija el array de votos, que es un array de enteros.
     * @param {Array} v
     */
    this.setVotos = function(v){
        this.done = false;
        this.partidos = [];
        this.options = {};
        this.votos = v;
    };

    /**
     * Fija el número de diputados, que es un entero.
     * @param {number} n
     */
    this.setDiputados = function(n){
        if(n > 0) {
            this.done = false;
            this.diputados = n;
        }
    };

    /**
     * Fija los partidos, que es un array de objetos tipo par, que incluyen
     * nombre del partido como una cadena y número de votos como un entero.
     * @param {Array.<Object>} p
     */
    this.setPartidos = function(p){
        this.done = false;
        this.votos = [];
        this.partidos = p;
    };

    /**
     * Fija las opciones de configuración(opcional)
     * @param {Object} o
     */
    this.setOptions = function(o){
        this.done = false;
        this.options = o;
    };

    /**
     * Inicializa this.votos y this.diputados para poder monstrar un ejemplo
     * de tipo I.
     */
    this.initExampleOne = function(){
        this.setVotos([150000,125000,115000,90000,50000,800]);
        this.setDiputados(10);
    };

    /**
     * Inicializa this.diputados, this.partidos y this.options para poder mostrar un ejemplo
     * de tipo II.
     */
    this.initExampleTwo = function(){
        this.setDiputados(10);
        this.setPartidos([
            { partido:'A', votos: 150000 },
            { partido:'B', votos: 125000 },
            { partido:'C', votos: 115000 },
            { partido:'D', votos: 90000 },
            { partido:'E', votos: 50000 },
            { partido:'F', votos: 800 }
        ]);
        this.setOptions({
            voteAccessor: function (object) {
                return object.votos
            },
            resultProperty: "diputados",
            base: 1.42
        });
    };

    /**
     * Función encargada de realizar el cálculo de los resultados.
     */
    this.compute = function(){
        if(!this.done) {
            this.done = true;
            if (this.partidos.length === 0) {
                this.resultados = this.dhondt.compute(this.votos, this.diputados);
            } else if (this.votos.length === 0) {
                this.resultados = this.dhondt.compute(this.partidos, this.diputados, this.options);
            }
        } else {
            console.log('No new calculations...\n');
        }
    };
    return this;

};
module.exports = DhondtObject;
