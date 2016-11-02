'use strict';

/**
 * Clase general para gestionar simulaciones electorales al congreso.
 */
class ElectoralSystem{
    constructor(){
        this.numero_de_diputados = 350;
        this.districts = [];
        this.author = 'anonymous';
    }

    calculate(){
        if(!Array.isArray(this.districts) || this.districts.length === 0) {
            throw new Error('this.districts.length must to be > 0');
        }
        throw new Error('Not yet implemented');
    }

}
module.exports = ElectoralSystem;