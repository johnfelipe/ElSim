/* jshint esversion: 6 */
const Subscriber = require('../models/subscriber');

{

    const remove = () =>  {
        return Subscriber.find({}).remove();
    };

    module.exports = {
        remove
    };

}