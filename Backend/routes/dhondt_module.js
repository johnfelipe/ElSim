var DhondtObject = function(){
    this.dhondt = require('dhondt');
    this.votos = [];
    this.diputados = 0;
    this.partidos = [];
    this.options = {};
    this.resultados = [];
    this.done = false;

    this.setVotos = function(v){
        this.done = false;
        this.partidos = [];
        this.options = {};
        this.votos = v;
    };

    this.setDiputados = function(n){
        this.done = false;
        this.diputados = n;
    };

    this.setPartidos = function(p){
        this.done = false;
        this.votos = [];
        this.partidos = p;
    };

    this.setOptions = function(o){
        this.done = false;
        this.options = o;
    };

    this.initExampleOne = function(){
        this.setVotos([150000,125000,115000,90000,50000,800]);
        this.setDiputados(10);
    };

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
