

const express = require('express'),
    router = express.Router(),
    Questions = require('../../services/quiz'),
    indexResponse = require('../../modules/response').response,
    sendError = require('../error').sendError;

{

    router.get('/quiz', (req, res) => {

        console.info('GET '.green + '/quiz');

        Questions.find({})
            .then((questions) => {
                let max = questions.length;
                let index = parseInt(Math.random() * max);
                indexResponse(req, res, 'pages/more/quiz', 'Quiz', {question: questions[index]});
            })
            .catch((err) => sendError(req, res, err));

    });

    router.post('/quiz', (req, res) => {

        console.info('POST '.green + '/quiz');


        Questions.findById(req.body.question_id)
            .then((question) => {
                let acierto = false;

                if(question.correct === req.body.answer){
                    acierto = true;
                }

                Questions.find({})
                    .then((questions) => {
                        let max = questions.length;
                        let index = parseInt(Math.random() * max);
                        indexResponse(req, res, 'pages/more/quiz', 'Quiz', {
                            question: questions[index],
                            acierto: acierto
                        });
                    })
                    .catch((err) => sendError(req, res, err));
            })
            .catch((err) => sendError(req, res, err));

    });

    module.exports = router;
}