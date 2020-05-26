(function() {
    'use strict';
    
    const mongoose = require('mongoose');
    const debug = require('debug')('sessionManager:database');

    const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/sessionManager';

    mongoose.connect(dbURI, {useNewUrlParser: true});
    mongoose.Promise = global.Promise;

    // CONNECTION EVENTS
    mongoose.connection.on('connected', function() {
        debug('Mongoose connected to ' + dbURI);
    });
    mongoose.connection.on('error', function(err) {
        debug('Mongoose connection error: ' + err);
    });
    mongoose.connection.on('disconnected', function() {
        debug('Mongoose disconnected');
    });

    require('./user');

})();
