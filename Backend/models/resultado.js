'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
 * Modelo para un resultado de unas elecciones
 * @type {any}
 */
var resultadoSchema =  new Schema({
        comunidad: { type: String, required: true },
        cod_provincia: { type: Number, required: true},
        provincia: { type: String, required: true },
        poblacion: { type: Number, required: true },
        num_mesas: { type: Number, required: true },
        total_censo_electoral: { type: Number, required: true },
        total_votantes: { type: Number, required: true },
        votos_validos: { type: Number, required: true },
        votos_candidaturas: { type: Number, required: true },
        votos_blanco: { type: Number, required: true },
        votos_nulos: { type: Number, required: true },
        eleccion: { type: Object, required: true},
        partidos: { type: Object, required: true } // votos, diputados
});
resultadoSchema.index({ cod_provincia: 1, eleccion: 1 }, { unique: true });
module.exports = mongoose.model('Resultado',resultadoSchema);
