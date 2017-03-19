/* jshint esversion: 6 */

const Question = require('../models/question');

/**
 *
 * @module quiz-game
 */
(function(){

    const checkQuestion = (question,answer) => {
        return (question.correct === answer);
    };

    const getAllQuestions = (done) => {
        Question.find({},(err,questions) => {
            if(err){
                throw err;
            }
            done(questions);
        });
    };

    const saveQuestion = (question,done) => {
        let q = new Question(question);
        q.save((err) => {
            if(err) {
                throw err;
            }
            done();
        });
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

})();