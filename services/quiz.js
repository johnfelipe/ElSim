/* jshint esversion: 6 */
const Question = require('../models/question');

{

    const saveOne = (question, done) => {
        let q = new Question(question);
        q.save((err) => done(err, question));
    };

    const checkQuestion = (done) => {
        done(new Error('not yet implemented'), null);
    };

    const find = (done) => {
        Question.find({}, (err, questions) => done(err, questions));
    };

    const removeOne = (id, done) => {
        Question.findByIdAndRemove({_id: id},
            (err, data) => done(err, data)
        );
    };

    const remove = (done) => {
        Question.find({}).remove(() => done());
    };

    module.exports = {
        saveOne,
        checkQuestion,
        find,
        removeOne,
        remove
    };

}