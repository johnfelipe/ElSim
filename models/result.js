/* jshint esversion: 6 */
'use strict';

/** Ellectoral result mongoose model */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;


let ResultSchema =  new Schema({
    comunidad: { type: String, required: true },
    cod_provincia: { type: Number, required: true},
    provincia: { type: String, required: true },
    poblacion: { type: Number, required: true },
    total_votantes: { type: Number, required: true },
    votos_validos: { type: Number, required: true },
    votos_candidaturas: { type: Number, required: true },
    votos_blanco: { type: Number, required: true },
    votos_nulos: { type: Number, required: true },
    eleccion: { type: Object, required: true},
    partidos: { type: Object, required: true }
});

ResultSchema.index({
        cod_provincia: 1,
        eleccion: 1
    },{
        unique: true
    }
);

/** @class Result */
module.exports = mongoose.model('Result',ResultSchema);
