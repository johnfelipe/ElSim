/* jshint esversion: 6 */
'use strict';

const nodemailer = require('nodemailer');
const Q = require('q');
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
    const sendMail = (destination, text) => {
        let promise = Q.defer();

        if(destination.length === 0){
            promise.reject('No destination to send mail');
        }else {
            let transporter = nodemailer.createTransport(transportConfig);

            let mailOptions = {
                from: '"EllSim News" ' + config.user,
                to: destination,
                subject: 'EllSim newsletter',
                text: text,
                html: '<h2>EllSim NewsLetter</h2> Thanks for be a member of our community.<hr><b>I want to tell you something:</b><br><i>' + text + '</i>'
            };

            const done = (err,result) => {
                if(err){
                    promise.reject(err);
                }else {
                    promise.resolve(result);
                }
            };

            transporter.sendMail(mailOptions, done);
        }
    };


    module.exports = {
        /** Sends an email to/from you want, with the text given */
        sendMail
    };
}

