/**
 *
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
        if(this.distritos.length !== 0) {
            this.distritos = [];
        }
        this.distritos = newDistritos;
        this.done = false;
    };

    /**
     * Realiza los cálculos para obtener el ganador.
     */
    this.compute = function(){
        var num_distritos = this.distritos.length;
        var i;
        for(i = 0; i < num_distritos; i++){
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
            var ganador = undefined, i;
            var distrito_size = distrito.length;
            for (i = 0; i < distrito_size; i++) {
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

