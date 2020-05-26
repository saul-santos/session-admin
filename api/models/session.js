(function() {
    'use strict';
    
    var mongoose = require('mongoose');

    var Schema = mongoose.Schema;
    
    var SessionSchema = new Schema({
        cost: {type: Number},
        duration: {type: Number},
        equipmentId: {type: Schema.Types.ObjectId, ref: 'Equipment'},
        finalTime: {type: Number},
        initialTime: {type: Number, required: true},
        userName: {type: String, max: 30}
    });
    
    module.exports = mongoose.model('Session', SessionSchema);

})();
