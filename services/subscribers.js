/* jshint esversion: 6 */
const Subscriber = require('../models/subscriber');

(function () {

    const remove = (done) =>  Subscriber.find({}).remove(() => done());

    module.exports = {
        remove
    };

})();
