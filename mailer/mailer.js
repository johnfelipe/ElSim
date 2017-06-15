const nodemailer = require('nodemailer');
const Q = require('q');
let config;

try {
    config = require('../credentials');
} catch (e) {
    console.log('credentials.js not found, using jesusgonzaleznovez@gmail.com as user');
    config = {user: 'foo@foo.com', password: 'foo'};
}

class Mailer {
    constructor(destination, text) {
        this.destination = destination;
        this.text = text;
        this.transportConfig = {
            service: 'Gmail',
            auth: {
                user: config.user,
                pass: config.password
            }
        };
    }

    sendMail() {
        let promise = Q.defer();

        if (this.destination.length === 0) {
            promise.resolve();
            return promise.promise;
        } else {
            let transporter = nodemailer.createTransport(this.transportConfig);

            let htmlContent = '<h2>ElSim NewsLetter</h2> ' +
                'Thanks for be a member of our community.<hr>' +
                '<h2>I want to tell you something:</h2>' +
                '<p><b>' + this.text + '</b></p>' +
                '<p><i>Please do not reply this message, it is auto generated.</i><br>' +
                'Want to unsubscribe? <br>' +
                'Send me an email to <a href="mailto:' + config.user + '">' + config.user + '</a></p>';

            let mailOptions = {
                from: '"ElSim News" ' + config.user,
                //to: this.destination,
                bcc: this.destination,
                subject: 'ElSim NewsLetter',
                text: this.text,
                html: htmlContent
            };

            const done = (err, result) => {
                if (err) {
                    promise.reject(err);
                    return;
                }
                promise.resolve(result);
            };

            transporter.sendMail(mailOptions, done);
        }

        return promise.promise;
    }
}
module.exports = Mailer;

