'use strict';
var _ = require('./utils_module'),
    dhondt = require('dhondt');
/**
 * Clase para gestionar objetos de tipo D'Hondt
 * @returns {DhondtObject}
 * @constructor
 */
class Dhondt{
    constructor(){
        this.votes = [];
        this.mandates = 0;
        this.results = [];
    }
    setVotes(v){
        this.votes = v;
    }
    setMandates(m){
        this.mandates = m;
    }
    getResults(){
        return this.results;
    }
    compute(){
        this.results = dhondt.compute(this.votes, this.mandates);
    }

}
module.exports = Dhondt;
