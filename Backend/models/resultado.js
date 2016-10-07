'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
 * Modelo para un resultado de unas elecciones
 * @type {any}
 */
module.exports = mongoose.model(
    'Resultado',
    new Schema({
        comunidad: String,
        cod_provincia: Number,
        provincia: String,
        poblacion: Number,
        num_mesas: Number,
        total_censo_electoral: Number,
        total_votantes: Number,
        votos_validos: Number,
        votos_candidaturas: Number,
        votos_blanco: Number,
        votos_nulos: Number,
        anio: Number,
        partidos: Object // votos, diputados
    })
);
