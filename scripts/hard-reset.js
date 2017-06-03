const Q = require('q');
const config = require('../config');
const mongoose = require('mongoose');
const console = require('better-console');
const colors = require('colors');
const HardReset = require('./hard-reset-class');

mongoose.connect(config.database);
mongoose.Promise = Q.Promise;

console.info('- System is ' + 'cleaning up'.green);
console.warn('---- Start date: '.green + new Date().toLocaleString());

const goodEnd = () => {
    console.info('- System has been ' + 'cleaned'.green + ' up successfully');
    console.warn('---- End date: '.green + new Date().toLocaleString());
    process.exit(0);
};

const badEnd = (err) => {
    console.info('ERROR');
    console.error(err);
    console.warn('---- End date: '.green + new Date().toLocaleString());
    process.exit(1);
};

HardReset.hardReset()
    .then(goodEnd)
    .catch(badEnd);
