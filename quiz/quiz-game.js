const Question = require('../models/question');

/** Class to handle quiz mini-game logic. */
class QuizGame {
    /**
     *
     * @param question
     * @param answer
     * @return {boolean}
     */
    static checkQuestion(question, answer) {
        return (question.correct === answer);
    }

    /**
     *
     * @return {*}
     */
    static getAllQuestions() {
        return Question.find({});
    }

    /**
     *
     * @param question
     * @return {*}
     */
    static saveQuestion(question) {
        let q = new Question(question);
        return q.save();
    }

    /**
     *
     * @param question
     */
    static deleteQuestion(question) {
        return Question.findOne(question).remove();
    }
}
module.exports = QuizGame;