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
    errorHandler = require('./utilities/errorHandler');

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

let miniGame = require('./routes/games/minigame'),
    quiz = require('./routes/games/quiz');

let comparator = require('./routes/simulator/comparator'),
    country = require('./routes/simulator/country'),
    district = require('./routes/simulator/district');

let users = require('./routes/users/users'),
    auth = require('./routes/users/auth')(passport);

let data = require('./routes/data'),
    misc = require('./routes/misc');

let apiCsv = require('./routes/api/csv'),
    apiLogs = require('./routes/api/logs'),
    apiMisc = require('./routes/api/misc'),
    apiQuestions = require('./routes/api/questions'),
    apiResults = require('./routes/api/results'),
    apiUsers = require('./routes/api/users');

app.use('/', miniGame);
app.use('/', quiz);

app.use('/', comparator);
app.use('/', country);
app.use('/', district);

app.use('/',data);
app.use('/',misc);

app.use('/', auth);
app.use('/Users', users);
app.use('/api/v1/csv', apiCsv);
app.use('/api/v1/Logs', apiLogs);
app.use('/api/v1', apiMisc);
app.use('/api/v1/Questions', apiQuestions);
app.use('/api/v1/Results', apiResults);
app.use('/api/v1/Users', apiUsers);

/** Catch 404 and forward to error handler */
app.use(errorHandler.catchNotFound);

/** Development error handler will print stacktrace */
(app.get('env') === 'development') ? app.use(errorHandler.developmentHandler) : app.use(errorHandler.productionHandler);

module.exports = app;
