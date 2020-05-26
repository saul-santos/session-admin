(function() {
    'use strict';

    var createError = require('http-errors');
    var express = require('express');
    var path = require('path');
    var cookieParser = require('cookie-parser');
    var logger = require('morgan');
    var helmet = require('helmet');
    var passport = require('passport');

    // [SH] Bring in the data model
    require('./api/models/database');
    // [SH] Bring in the Passport config after model is defined
    require('./api/config/passport');

    var apiRouter = require('./api/routes/api');

    var app = express();

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');
    
    app.use(helmet());
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, process.env.APP_FOLDER || 'dist')));
    
    app.use(passport.initialize());
    app.use('/api', apiRouter);
    
    // catch 404 and forward to error handler
    app.use(function(err, req, res, next) {
        if(err.name === 'UnauthorizedError') {
            res.status(401);
            res.json({'message' : err.name + ': ' + err.message});
        } else {
            next(createError(404));
        }
    });
    
    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res
                .status(err.status || 500)
                .send('error', {
                    message: err.message
                });

            next(err);
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res
            .status(err.status || 500)
            .send('error', {
                message: err.message,
                error: err
            });

        next(err);
    });
    
    module.exports = app;

})();
