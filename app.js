/* jshint esversion: 6 */
'use strict';
/** Main module of the server side */
let express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    app = express(),
    mongoose = require('mongoose'),
    config = require('./config'),
    passport = require('passport'),
    flash = require('connect-flash'),
    expressSession = require('express-session'),
    initPassport = require('./passport/init'),
    errorHandler = require('./modules/errorHandler');

/** Common configuration for the server side. */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon('public/favicon.png'));
mongoose.Promise = global.Promise;
mongoose.connect(config.database);
app.set('superSecret', config.secret);

/** Configuring Passport */
// TODO - Why Do we need this key ?
app.use(expressSession({secret: config.secret, cookie: {maxAge: 60000}, resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
initPassport(passport);

/** Flash messages */
app.use(flash());

let routes = require('./routes/index')(passport),
    users = require('./routes/users')(passport),
    apiRoutes = require('./routes/api')();

app.use('/', routes);
app.use('/users', users);
app.use('/api', apiRoutes);

/** Catch 404 and forward to error handler */
app.use(errorHandler.catchNotFound);

/** Development error handler will print stacktrace */
(app.get('env') === 'development') ? app.use(errorHandler.developmentHandler) : app.use(errorHandler.productionHandler);

module.exports = app;
