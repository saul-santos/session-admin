(function() {
    'use strict';
    
    var mongoose = require('mongoose');

    var Schema = mongoose.Schema;

    var FaresSchema = new Schema({
        pc: {
            hour: {type: Number},
            initial: {type: Number}
        },
        console: {
            hour: {type: Number},
            initial: {type: Number}
        }
    });

    module.exports = mongoose.model('Fares', FaresSchema);
})();
