/* jshint esversion: 6 */
'use strict';
/**
 * Main module of the server side
 * @module app
 */
let express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    app = express(),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    config = require('./config'),
    api = require('./modules/functions/api-functions'),
    User = require('./models/user'),
    passport = require('passport'),
    flash = require('connect-flash'),
    expressSession = require('express-session');

/**
 * @description Common configuration for the server side.
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.Promise = global.Promise;
mongoose.connect(config.database);
app.set('superSecret', config.secret);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));



/** Configuring Passport */
// TODO - Why Do we need this key ?
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

/** Using the flash middleware provided by connect-flash to store messages in session and displaying in templates */
app.use(flash());

// Initialize Passport
let initPassport = require('./passport/init');
initPassport(passport);

let routes = require('./routes/index')(passport),
    users = require('./routes/users')(passport);
app.use('/', routes);
app.use('/users', users);

/** Api routes under authentication */
let apiRoutes = express.Router();

/**
 * To check if is authenticated
 * @function app/isAuthenticated
 */
let isAuthenticated = function (req, res, next) {
    let token = req.body.token || req.param('token') || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Failed to authenticate token.'});
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
};

/**
 * Function to authenticate
 * @function app/authenticate
 */
let authenticate = function (req, res) {
    console.log('user ' + req.body.email + ' is trying to authenticate.');
    User.findOne({email: req.body.email}, done);
    function done(err, user) {
        let object = {
            success: false,
            message: 'Authentication failed',
            token: null
        };
        if (err) throw err;
        if (user) {
            if (user.password === req.body.password) {
                let token = jwt.sign(user, app.get('superSecret'), {
                    expiresIn: 3600 // expires in 1 hours
                });
                object.success = true;
                object.message = 'Enjoy your token!';
                object.token = token;
            }
        }
        res.json(object);
    }
};

/**
 * AUTH routes
 */
apiRoutes.post('/authenticate', authenticate);
apiRoutes.use(isAuthenticated);

/**
 * GET routes
 * @see modules/functions/api-functions
 */
app.get('/setup', api.setup);
app.get('/loadCsv', api.loadCsv);
apiRoutes.get('/', api.apiWelcome);
apiRoutes.get('/users', api.findAllUsers);
apiRoutes.get('/check', api.check);
apiRoutes.get('/logs', api.findLogs);
apiRoutes.get('/resultados/year/:anio', api.findManyResultadosByAnio);
apiRoutes.get('/resultados/district/:cod_provincia', api.findManyResultadosByProvincia);
apiRoutes.get('/resultados/setup', api.loadCsv);
apiRoutes.get('/resultados/:id', api.findOneResultado);
apiRoutes.get('/resultados', api.findAllResultados);

/**
 * POST routes
 * @see modules/functions/api-functions
 */
apiRoutes.post('/users', api.saveOneUser);
apiRoutes.post('/resultados', api.saveOneResultado);

/**
 * PUT routes
 * @see modules/functions/api-functions
 */
apiRoutes.put('/users/:id', api.updateOneUser);
apiRoutes.put('/resultados/:id', api.updateOneResultado);

/**
 * DELETE routes
 * @see modules/functions/api-functions
 */
apiRoutes.delete('/users/:id', api.deleteOneUser);
apiRoutes.delete('/logs', api.deleteAllLogs);
apiRoutes.delete('/resultados/:id', api.deleteOneResultado);
apiRoutes.delete('/resultados', api.deleteAllResultados);


app.use('/api', apiRoutes);

/**
 * Catch 404 and forward to error handler
 */
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/**
 * Development error handler will print stacktrace
 */
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('pages/error', {
            message: err.message,
            error: err
        });
    });
}

/**
 * Production error handler, no stacktraces leaked to user
 */
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('pages/error', {
        message: err.message,
        error: {}
    });
});

/**
 * For debug
 */
app.locals.inspect = require('util').inspect;


module.exports = app;
