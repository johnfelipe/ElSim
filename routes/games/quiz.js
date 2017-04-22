/* jshint esversion: 6 */
'use strict';
const express = require('express'),
    router = express.Router(),
    Questions = require('../../services/quiz'),
    indexResponse = require('../../modules/response').response,
    sendError = require('../error').sendError;
{

    router.get('/quiz', (req, res) => {

        Questions.find({})
            .then((questions)=> {
                console.warn('Questions found: '.blue + questions.length);
                let max = questions.length;
                let index = parseInt(Math.random() * max);
                indexResponse(req, res, 'pages/more/quiz', 'Quiz', {question: questions[index]});
            })
            .catch((err)=> {
                sendError(req,res,err);
            });

    });


    module.exports = router;
}