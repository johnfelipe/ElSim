/* jshint esversion: 6 */

const Question = require('../models/question');

class QuizGame {
    constructor() {

    }

    static checkQuestion(question, answer) {
        return (question.correct === answer);
    }

    static getAllQuestions() {
        return Question.find({});
    }

    static saveQuestion(question) {
        let q = new Question(question);
        return q.save();
    };

    static deleteQuestion(question) {
        return Question.findOne(question).remove();
    }
}
module.exports = QuizGame;