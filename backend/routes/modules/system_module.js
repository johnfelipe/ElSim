'use strict';

/**
 * Clase general para gestionar simulaciones electorales al congreso.
 */
class SistemaElectoral{
    constructor(){
        this.numero_de_diputados = 350;
        this.circunscripciones = [];
        this.autor = 'anonymous';
    }
    setNumeroDeDiputados(n){
        if(n < 1) throw 'Negative number in setNumeroDeDiputados(' + n + ')';
        this.numero_de_diputados = n;
        console.log('numero_de_diputados set to ' + this.numero_de_diputados);

    }

}
module.exports = SistemaElectoral;