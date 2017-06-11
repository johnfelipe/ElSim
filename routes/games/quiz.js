const express = require('express'),
    router = express.Router(),
    Questions = require('../../services/quiz'),
    indexResponse = require('../../modules/response').response,
    sendError = require('../error').sendError;

{

    router.get('/quiz', (req, res) => {

        console.info('GET '.yellow + '/quiz');

        Questions.find({})
            .then((questions) => {
                if (questions.length > 0) {
                    let max = questions.length;
                    let index = parseInt(Math.random() * max);
                    indexResponse(req, res, 'pages/more/quiz', 'Quiz', {question: questions[index]});
                } else {
                    indexResponse(req, res, 'pages/more/quiz', 'Quiz', {question: false});
                }
            })
            .catch((err) => sendError(req, res, err));

    });

    router.post('/quiz', (req, res) => {

        console.info('POST '.yellow + '/quiz');
        if (typeof req.body.question_id === 'undefined' ||
            typeof req.body.answer === 'undefined') {
            sendError(req, res, 'Parameters error');
            return;
        }
        let question,isCorrect;

        const handleWholeQuestions = (questions) => {
            let max = questions.length;

            let index = parseInt(Math.random() * max);

            indexResponse(req, res, 'pages/more/quiz', 'Quiz', {
                question: questions[index],
                isCorrect: isCorrect
            });
        };

        const handleQuestion = (q) => {

            question = q;

            if(!question){
                sendError(req,res,'Question not found');
                return;
            }

            isCorrect = (question.correct === req.body.answer);

            return Questions.find({});
        };

        Questions.findById(req.body.question_id)
            .then(handleQuestion)
            .then(handleWholeQuestions)
            .catch((err) => sendError(req, res, err));

    });

    module.exports = router;
}