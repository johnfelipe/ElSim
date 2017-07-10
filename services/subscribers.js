const Subscriber = require('../models/subscriber');

module.exports = () => Subscriber.find({}).remove();