/* jshint esversion: 6 */
const Subscriber = require('../models/subscriber');

{

    const remove = () => Subscriber.find({}).remove();

    module.exports = {
        remove
    };

}