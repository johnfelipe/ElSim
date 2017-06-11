const Subscriber = require('../models/subscriber');

class SubscriberService {
    static remove() {
        return Subscriber.find({}).remove();
    }
}
module.exports = SubscriberService;