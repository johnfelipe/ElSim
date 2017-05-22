
const Subscriber = require('../models/subscriber');

class SubscriberService {
    constructor() {

    }

    static remove() {
        return Subscriber.find({}).remove();
    }
}
module.exports = SubscriberService;