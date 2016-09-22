/**
 * Clase para manejar objetos basados en el método Uninominal Mayoritario.
 * @returns {UninominalObject}
 * @constructor
 */
var UninominalObject = function (){
    this.distritos = [];
    this.ganadores = [];
    this.done = false;

    /**
     * Fija los distritos que es un array de arrays de objetos
     * que al menos debería tener la clave Object.votos
     * @param {Array.<Array.<Object>>} newDistritos
     */
    this.setDistritos = function(newDistritos){
        if(this.distritos.length) {
            this.distritos = [];
        }
        this.distritos = newDistritos;
        this.done = false;
    };

    /**
     * Realiza los cálculos para obtener el ganador.
     */
    this.compute = function(){
        var i, num_distritos;
        for(i = 0, num_distritos = this.distritos.length; i < num_distritos; i++){
            this.winner(this.distritos[i]);
        }
    };

    /**
     * Comprueba el ganador de un distrito concreto.
     * @param {Array.<Object>} distrito
     */
    this.winner = function(distrito){
        if(!this.done) {
            this.done = true;
            var ganador, i, size;
            for (i = 0, size = distrito.length; i < size; i++) {
                if (ganador === undefined) {
                    ganador = distrito[0];
                } else {
                    if (distrito[i].votos > ganador.votos) {
                        ganador = distrito[i];
                    }
                }
            }
            this.ganadores.push(ganador);
        } else{
            console.log('No new calculations...');
        }
    };

    return this;
};
module.exports = UninominalObject;

