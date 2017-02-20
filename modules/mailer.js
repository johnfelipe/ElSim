/* jshint esversion: 6 */
'use strict';

const nodemailer = require('nodemailer');

let config;

try {
    config = require('../credentials');
} catch (e) {
    console.log('credentials.js not found, using jesusgonzaleznovez@gmail.com as user');
    config = {user: 'foo@foo.com', password: 'foo'};
}

const transportConfig = {
    service: 'Gmail',
    auth: {
        user: config.user,
        pass: config.password
    }
};

(function () {
    const sendMail = (destination, text, done) => {
        let transporter = nodemailer.createTransport(transportConfig);
        let mailOptions = {
            from: '"EllSim News" ' + config.user,
            to: destination,
            subject: 'EllSim newsletter',
            text: text,
            html: '<h2>EllSim NewsLetter</h2> Thanks for be a member of our comunity.<hr><b>I want to tell you something:</b><br><i>' + text + '</i>'
        };
        transporter.sendMail(mailOptions, done);
    };

    module.exports = {
        sendMail: sendMail
    };
})();

