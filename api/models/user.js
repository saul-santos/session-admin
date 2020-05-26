(function() {
    'use strict';

    const mongoose = require('mongoose');
    const crypto = require('crypto');
    const jwt = require('jsonwebtoken');

    var Schema = mongoose.Schema;

    var UserSchema = new Schema({
        email: {type: String, unique: true, required: true},
        name: {type: String, required: true},
        rol: {type: String, required: true},
        hash: String,
        salt: String
    });

    UserSchema.methods.setPassword = function(password) {
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64,
            'sha512').toString('hex');
    };

    UserSchema.methods.validPassword = function(password) {
        var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64,
            'sha512').toString('hex');
        return this.hash === hash;
    };

    UserSchema.methods.generateJwt = function() {
        var expiry = new Date();
        expiry.setDate(expiry.getDate() + 7);
        
        return jwt.sign({
            _id: this.id,
            email: this.email,
            name: this.name,
            rol: this.rol,
            exp: parseInt(expiry.getTime() / 1000),
        }, process.env.JWT_KEY || 'MY_SECRET');
    };

    mongoose.model('User', UserSchema);

})();
