/* jshint esversion: 6 */
const Question = require('../models/question');

{

    const saveOne = (question) => {
        let q = new Question(question);
        return q.save();
    };

    const checkQuestion = (done) => {
        done(new Error('not yet implemented'), null);
    };

    const find = () => {
        return Question.find({});
    };

    const removeOne = (id) => {
        return Question.findByIdAndRemove({_id: id});
    };

    const remove = () => {
        return Question.find({}).remove();
    };

    module.exports = {
        saveOne,
        checkQuestion,
        find,
        removeOne,
        remove
    };

}