(function() {
    'use strict';
    
    var Equipment = require('../models/equipment');

    exports.getEquipments = function(req, res, next) {
        Equipment
            .find()
            .populate('sessionId')
            .exec(function(err, equipments) {
                if(err)
                    return next(err);
    
                res.json(equipments);
            });
    };
    
    exports.getEquipment = function(req, res, next) {
        Equipment
            .findById(req.params.id)
            .exec(function(err, equipment) {
                if(err)
                    return next(err);
    
                res.json(equipment);
            });
    };
    
    exports.createEquipment = function(req, res, next) {
        Equipment
            .findOne({'name': req.body.name})
            .exec(function(err, equipmentExist) {
                if(err)
                    return next(err);
    
                if(equipmentExist){
                    res
                        .status(409)
                        .json({
                            message: 'Ya existe un equipo con el nombre indicado'
                        });
                } else {
                    var equipment = new Equipment({
                        name: req.body.name,
                        imageUrl: req.body.imageUrl,
                        sessionId: req.body.sessionId,
                        type: req.body.type
                    });
                    equipment
                        .save(function(err) {
                            if(err)
                                return next(err);
                            
                            res.json(equipment);
                        });
                }
            });
    };
    
    exports.updateEquipment = function(req, res, next) {
        var equipment = new Equipment({
            name: req.body.name,
            imageUrl: req.body.imageUrl,
            sessionId: req.body.sessionId,
            type: req.body.type,
            _id: req.params.id
        });
    
        Equipment
            .findByIdAndUpdate(req.params.id, equipment, {}, function(err) {
                if(err)
                    return next(err);
    
                res.json(equipment);
            });
    };
    
    exports.deleteEquipment = function(req, res, next) {
        Equipment
            .findByIdAndRemove(req.params.id, function(err, equipmentDeleted){
                if(err)
                    return next(err);
    
                res.json(equipmentDeleted);
            });
    };

})();
