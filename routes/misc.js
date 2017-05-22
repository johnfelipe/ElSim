

const express = require('express'),
    router = express.Router(),
    response = require('../modules/response').response,
    Moment = require('moment'),
    codigos = require('../misc/codigos'),
    parties = require('../misc/parties'),
    console = require('better-console'),
    colors = require('colors'),
    loadAll = require('../services/all').loadAll,
    sendError = require('./error').sendError;

let credentials;

try {
    credentials = require('../credentials');
} catch (e) {
    console.info('credentials.js not found, using jesusgonzaleznovez@gmail.com as user');
    credentials = {user: 'jesusgonzaleznovez@gmail.com'};
}

{
    router.get('/', (req, res) => {
        console.info('GET '.green + ' /');
        response(req, res, 'pages/index', 'EllSim', {moment: Moment, err: null});
    });

    router.get('/help', (req, res) => {
        console.info('GET '.green + ' /help');
        response(req, res, 'pages/misc/help', 'Help', false);
    });

    router.get('/learn', (req, res) => {
        console.info('GET '.green + ' /learn');
        response(req, res, 'pages/more/learn', 'Learn', false);
    });

    router.get('/resources', (req, res) => {
        console.info('GET '.green + ' /resources');
        response(req, res, 'pages/more/resources', 'Resources', false);
    });

    router.get('/parties', (req, res) => {
        console.info('GET '.green + ' parties');
        response(req, res, 'pages/more/parties', 'Parties', {
            parties: parties
        });
    });

    router.get('/admin', (req, res) => {
        console.info('GET '.green + ' /admin');
        if (!req.user || req.user.email !== credentials.user) {
            sendError(req,res,{
                result: 'fail',
                message: 'You are not the admin, sorry!',
                err: {
                    message: 'You are not the admin, sorry!',
                    status: 401
                }
            });
        } else {
            loadAll()
                .then((resultado) => {
                    res.render('pages/auth/admin', {
                        user: req.user,
                        title: 'Administration',
                        Logs: resultado.logs,
                        Results: resultado.results,
                        Users: resultado.users
                    });
                })
                .catch((err) => {
                    sendError(req,res,err);
                });
        }
    });

    module.exports = router;
}