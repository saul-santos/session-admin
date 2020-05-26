(function() {
    'use strict';

    const passport = require('passport');
    const LocalStrategy = require('passport-local').Strategy;
    const mongoose = require('mongoose');
    const User = mongoose.model('User');

    passport.use(new LocalStrategy({
        usernameField: 'email'
    }, function(username, password, done) {
        User.findOne({ email: username }, function(err, user) {
            if(err) { return done(err); }
            // Return if user not found in database
            if(!user) {
                return done(null, false, {
                    message: 'Usuario no encontrado'
                });
            }

            // Return if password is wrong
            if(!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Contraseña incorrecta'
                });
            }

            // If credentials are correct, return the user object.
            return done(null, user);
        });
    }));

})();
 