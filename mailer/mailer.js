const nodemailer = require('nodemailer');

let config = require('../credentials');

class Mailer {
    constructor(destination, text) {
        this.destination     = destination;
        this.text            = text;
        this.transportConfig = {
            service: 'Gmail',
            auth   : {
                user: config.user,
                pass: config.password
            }
        };
    }

    async sendMail() {
        try {
            if (this.destination.length === 0) {
                return 0;
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
                    from   : '"ElSim News" ' + config.user,
                    bcc    : this.destination,
                    subject: 'ElSim NewsLetter',
                    text   : this.text,
                    html   : htmlContent
                };

                return await transporter.sendMail(mailOptions);
            }
        } catch (err) {
            throw err;
        }
    }
}
module.exports = Mailer;

