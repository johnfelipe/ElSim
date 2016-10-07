'use strict';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
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

/**
 * Configurando api, autenticación
 */
var mongoose    = require('mongoose');
var jwt         = require('jsonwebtoken');
var config      = require('./config');
var api         = require('./routes/api');
var User        = require('./models/user');
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
app.get('/setup', api.setup);
app.get('/', api.apiWelcome);

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
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
                var token = jwt.sign(user, app.get('superSecret'), {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }
        }
    });
};


apiRoutes.post('/authenticate', authenticate);
apiRoutes.use(isAuthenticated);
apiRoutes.get('/', api.apiWelcome);
apiRoutes.get('/list', api.userList);
apiRoutes.get('/check', api.check);
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
        res.render('error', {
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
    res.render('error', {
        message: err.message,
        error: {}
    });
});

/**
 * For debug
 */
app.locals.inspect = require('util').inspect;


module.exports = app;
