/* jshint esversion: 6 */
'use strict';
const express = require('express'),
    router = express.Router(),
    Questions = require('../../services/quiz'),
    indexResponse = require('../../modules/response').response;

router.get('/quiz', (req, res) => {
    
    Questions.find((err, questions) => {
        let max = questions.length;
        let index = parseInt(Math.random() * max);
        indexResponse(req, res, 'pages/more/quiz', 'Quiz', {question: questions[index]});
    });
    
});

module.exports = router;