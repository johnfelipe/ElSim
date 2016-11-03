'use strict';
var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    routes = require('./routes/index'),
    users = require('./routes/users');

var app = express();

var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    config = require('./config'),
    api = require('./routes/api'),
    User= require('./models/user');

/**
 * View engine setup
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/**
 * Uncomment after placing your favicon in /public
 */
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

mongoose.Promise = global.Promise;
mongoose.connect(config.database);

app.set('superSecret', config.secret);
/**
 * Use body parser so we can get info from POST and/or URL parameters
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Use morgan to log requests to the console
 */
app.use(logger('dev'));

/**
 * Rutas que requieren estar autenticado
 */
var apiRoutes = express.Router();
var isAuthenticated = function (req, res, next) {
    var token = req.body.token || req.param('token') || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
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

var authenticate = function (req, res) {
    console.log('user ' + req.body.email + ' is trying to authenticate.');
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        var object;
        if (err) throw err;
        if (!user) {
            object = {
                success: false,
                message: 'Authentication failed. User not found.'
            };
        } else if (user) {
            if (user.password !== req.body.password) {
                object = {
                    success: false,
                    message: 'Authentication failed. Wrong password.'
                };
            } else {
                var token = jwt.sign(user, app.get('superSecret'), {
                    expiresIn: 3600 // expires in 1 hours
                });
                object = {
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                };
            }
        }
        res.json(object);
    });
};

/**
 * AUTH routes
 */
apiRoutes.post('/authenticate', authenticate);
apiRoutes.use(isAuthenticated);

/**
 * GET routes
 */
app.get('/setup', api.setup);
apiRoutes.get('/', api.apiWelcome);
apiRoutes.get('/users', api.findAllUsers);
apiRoutes.get('/check', api.check);
apiRoutes.get('/logs', api.findLogs);
apiRoutes.get('/resultados/setup',api.loadCsv);
apiRoutes.get('/resultados',api.findAllResultados);
apiRoutes.get('/resultados/:id', api.findOneResultado);
apiRoutes.get('/resultados/year/:anio',api.findManyResultadosByAnio);
apiRoutes.get('/resultados/provincia/:cod_provincia',api.findManyResultadosByProvincia);

/**
 * POST routes
 */
apiRoutes.post('/users', api.saveOneUser);
apiRoutes.post('/resultados',api.saveOneResultado);

/**
 * PUT routes
 */
apiRoutes.put('/users/:id', api.updateOneUser);
apiRoutes.put('/resultados/:id',api.updateOneResultado);

/**
 * DELETE routes
 */
apiRoutes.delete('/users/:id', api.deleteOneUser);
apiRoutes.delete('/logs', api.deleteAllLogs);
apiRoutes.delete('/resultados/:id',api.deleteOneResultado);
apiRoutes.delete('/resultados',api.deleteAllResultados);



app.use('/api', apiRoutes);

/**
 * Catch 404 and forward to error handler
 */
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/**
 * Development error handler will print stacktrace
 */
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
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
app.use(function(err, req, res, next) {
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
