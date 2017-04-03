/* jshint esversion: 6 */
'use strict';
const express = require('express'),
    router = express.Router(),
    response = require('../modules/response').response,
    Moment = require('moment'),
    codigos = require('../misc/codigos'),
    parties = require('../misc/parties'),
    console = require('better-console'),
    loadAll = require('../services/all').loadAll;

let credentials;

try {
    credentials = require('../credentials');
} catch (e) {
    console.warn('credentials.js not found, using jesusgonzaleznovez@gmail.com as user');
    credentials = {user: 'jesusgonzaleznovez@gmail.com'};
}
{
    router.get('/', (req, res) => response(
        req, res, 'pages/index', 'EllSim', {moment: Moment, err: null}
    ));

    router.get('/help', (req, res) => response(
        req, res, 'pages/misc/help', 'Help', false
    ));

    router.get('/learn', (req, res) => response(
        req, res, 'pages/more/learn', 'Learn', false
    ));

    router.get('/resources', (req, res) => response(
        req, res, 'pages/more/resources', 'Resources', false
    ));

    router.get('/parties', (req, res) => {
        response(req, res, 'pages/more/parties', 'Parties', {
            parties: parties
        });
    });

    router.get('/admin', (req, res) => {

        if (!req.user || req.user.email !== credentials.user) {
            res.render('pages/misc/error', {
                result: 'fail',
                message: 'You are not the admin, sorry!',
                err: {
                    message: 'You are not the admin, sorry!',
                    status: 401
                }
            });
        } else {
            loadAll((logs, results, users) => res.render('pages/auth/admin', {
                    user: req.user,
                    title: 'Administration',
                    Logs: logs,
                    Results: results,
                    Users: users
                }
            ));
        }
    });

    module.exports = router;
}