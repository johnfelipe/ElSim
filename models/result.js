

/** Ellectoral result mongoose model */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const Q = require('q');
mongoose.Promise = Q.Promise;
let ResultSchema =  new Schema({
    community: { type: String, required: true },
    cod_province: { type: Number, required: true},
    province: { type: String, required: true },
    population: { type: Number, required: true },
    total_voters: { type: Number, required: true },
    valid_votes: { type: Number, required: true },
    votes_to_parties: { type: Number, required: true },
    blank_votes: { type: Number, required: true },
    null_votes: { type: Number, required: true },
    election: { type: Object, required: true},
    parties: { type: Object, required: true }
});

ResultSchema.index({
        cod_province: 1,
        election: 1
    },{
        unique: true
    }
);

module.exports = mongoose.model('Result',ResultSchema);
