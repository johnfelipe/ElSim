/* jshint esversion: 6 */

const Question = require('../models/question');

/**
 *
 * @module quiz-game
 */
{

    const checkQuestion = (question, answer) => (question.correct === answer);

    const getAllQuestions = () => Question.find({});

    const saveQuestion = (question) => {
        let q = new Question(question);
        return q.save();
    };

    const deleteQuestion = (question) => Question.findOne(question).remove();

    module.exports = {
        checkQuestion,
        getAllQuestions,
        saveQuestion,
        deleteQuestion
    };

}