const express   = require('express');
const router    = express.Router();
const response  = require('../modules/response').response;
const moment    = require('moment');
const codigos   = require('../misc/codigos');
const parties   = require('../misc/parties');
const console   = require('better-console');
const colors    = require('colors');
const loadAll   = require('../services/all');
const sendError = require('./error').sendError;

let credentials;

try {
    credentials = require('../credentials');
} catch (e) {
    console.info('credentials.js not found, using jesusgonzaleznovez@gmail.com as user');
    credentials = {user: 'jesusgonzaleznovez@gmail.com'};
}

{
    router.get('/', (req, res) => {
        console.info('GET '.yellow + ' /');
        response(req, res, 'pages/index', 'ElSim', {moment, err: null});
    });

    router.get('/help', (req, res) => {
        console.info('GET '.yellow + ' /help');
        response(req, res, 'pages/misc/help', 'Help', false);
    });

    router.get('/learn', (req, res) => {
        console.info('GET '.yellow + ' /learn');
        response(req, res, 'pages/more/learn', 'Learn', false);
    });

    router.get('/resources', (req, res) => {
        console.info('GET '.yellow + ' /resources');
        response(req, res, 'pages/more/resources', 'Resources', false);
    });

    router.get('/parties', (req, res) => {
        console.info('GET '.yellow + ' parties');
        response(req, res, 'pages/more/parties', 'Parties', {
            parties
        });
    });

    router.get('/admin', (req, res) => {
        console.info('GET '.yellow + ' /admin');

        (async () => {
            try {
                if (!req.user || req.user.email !== credentials.adminUser) {
                    sendError(req, res, {
                        result : 'fail',
                        message: 'You are not the admin, sorry!',
                        err    : {
                            message: 'You are not the admin, sorry!',
                            status : 401
                        }
                    });
                } else {
                    let resultado = await loadAll();

                    res.render('pages/auth/admin', {
                        user   : req.user,
                        title  : 'Administration',
                        Logs   : resultado.logs,
                        Results: resultado.results.length,
                        Users  : resultado.users,
                        moment
                    });

                }
            } catch (err) {
                sendError(req, res, err);
            }
        })();
    });

    module.exports = router;
}