/* jshint esversion: 6 */
'use strict';
const express = require('express'),
    router = express.Router(),
    response = require('../modules/response').response,
    Moment = require('moment'),
    codigos = require('../misc/codigos'),
    parties = require('../misc/parties'),
    console = require('better-console'),
    loadAll = require('../services/all').loadAll,
    sendError = require('./error').sendError;

let credentials;

try {
    credentials = require('../credentials');
} catch (e) {
    console.warn('credentials.js not found, using jesusgonzaleznovez@gmail.com as user');
    credentials = {user: 'jesusgonzaleznovez@gmail.com'};
}

{
    router.get('/', (req, res) => {
        console.warn('Getting index');
        response(req, res, 'pages/index', 'EllSim', {moment: Moment, err: null});
    });

    router.get('/help', (req, res) => {
        console.warn('Getting /help');
        response(req, res, 'pages/misc/help', 'Help', false);
    });

    router.get('/learn', (req, res) => {
        console.warn('Getting /learn');
        response(req, res, 'pages/more/learn', 'Learn', false);
    });

    router.get('/resources', (req, res) => {
        console.warn('Getting /resources');
        response(req, res, 'pages/more/resources', 'Resources', false);
    });

    router.get('/parties', (req, res) => {
        console.warn('Getting parties');
        response(req, res, 'pages/more/parties', 'Parties', {
            parties: parties
        });
    });

    router.get('/admin', (req, res) => {
        console.warn('Getting /admin');
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