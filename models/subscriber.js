const mongoose   = require('mongoose');
const Schema     = mongoose.Schema;
const Q          = require('q');
mongoose.Promise = Q.Promise;

let SubscriberSchema = new Schema({
    email  : {
        type    : String,
        required: true,
        index   : {unique: true}
    },
    options: {
        type    : Object,
        required: true
    }
});

module.exports = mongoose.model('Subscriber', SubscriberSchema);
