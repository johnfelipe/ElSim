/**
 * Módulo de utilidades usado por otros módulos.
 * @returns {UtilsObject}
 * @constructor
 */
var UtilsObject = function(){
    /**
     * Salida a consola con colores e indentación.
     * @param message{String}
     */
    this.prettyPrint = function(message){
        options = {
            depth: 2,
            colors: true
        };
        console.dir(message,options);
    };
    /**
     * Dado un array con elementos repetidos establece como
     * claves cada elemento y como valor de cada clave el número
     * de repeticiones de dicha clave en el array.
     * [a,a,a,b,c,c] --> {a:3, b:1, c:2}
     * @param array{Array}
     */
    this.groupByKey = function(array){
        var counts = {};
        for (var i = 0, len = array.length; i < len; ++i) {
            counts[array[i]] = 1 + (counts[array[i]] || 0);
        }
        return counts;
    };
    return this;
};
module.exports = UtilsObject;