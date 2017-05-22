

/** Subscriber mongoose model */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const Q = require('q');
mongoose.Promise = Q.Promise;
let SubscriberSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    options: {
        type: Object,
        required: true
    }
});

module.exports = mongoose.model('Subscriber', SubscriberSchema);
