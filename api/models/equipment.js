(function() {
    'use strict';
    var mongoose = require('mongoose');

    var Schema = mongoose.Schema;

    var EquipmentSchema = new Schema({
        imageUrl: {type: String, max: 150},
        name: {type: String, required: true, max: 30},
        sessionId: {type: Schema.Types.ObjectId, ref: 'Session'},
        type: {type: String, enum: ['pc', 'console'], required: true}
    });

    module.exports = mongoose.model('Equipment', EquipmentSchema);
})();
