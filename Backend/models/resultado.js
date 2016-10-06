'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
        partidos: Array // votos, diputados
    })
);
