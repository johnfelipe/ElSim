/* jshint esversion: 6 */

const Question = require('../models/question');

/**
 *
 * @module quiz-game
 */
{

    const checkQuestion = (question,answer) => {
        return (question.correct === answer);
    };

    const getAllQuestions = () => {
        return Question.find({});
    };

    const saveQuestion = (question) => {
        let q = new Question(question);
        return q.save();
    };

    const deleteQuestion = (question,done) => {
        console.log(question);
        done();
    };


    module.exports = {
        checkQuestion,
        getAllQuestions,
        saveQuestion,
        deleteQuestion
    };

}