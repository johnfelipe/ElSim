/* jshint esversion: 6 */

const config = require('../../config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const chai = require('chai');
const Quiz = require('../../quiz/quiz-game');
describe('Quiz Game', () => {
    before((done) => {
        try {
            mongoose.connect(config.database, done);
        }catch(e){
            console.log(e);
        }
    });
    it('getAllQuestions', (done) => {
       Quiz.getAllQuestions((err,data) => {
           chai.assert(data.length !== 0);
           done();
       });
    });
});
