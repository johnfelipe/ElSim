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

/**
 *
 * @module mailer
 */
{
    const sendMail = (destination, text, done) => {
        if(destination.length === 0){
            done(new Error('No destination to send mail'),null);
        }else {
            let transporter = nodemailer.createTransport(transportConfig);
            let mailOptions = {
                from: '"EllSim News" ' + config.user,
                to: destination,
                subject: 'EllSim newsletter',
                text: text,
                html: '<h2>EllSim NewsLetter</h2> Thanks for be a member of our community.<hr><b>I want to tell you something:</b><br><i>' + text + '</i>'
            };
            transporter.sendMail(mailOptions, done);
        }
    };


    module.exports = {
        /** Sends an email to/from you want, with the text given */
        sendMail
    };
}

