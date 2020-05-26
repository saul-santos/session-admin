(function() {
    'use strict';

    var Session = require('../models/session');
    var moment = require('moment');

    exports.getSessions = function(req, res, next) {
        Session
            .find({})
            .and([
                { initialTime: { $gte: req.params.start ? req.params.start : moment().startOf('day').unix() }},
                { finalTime: { $lte: req.params.end ? req.params.end : moment().unix() }}
            ])
            .populate('equipmentId')
            .exec(function(err, sessions) {
                if(err)
                    return next(err);

                res.json(sessions);
            });
        
    };

    exports.getSession = function(req, res, next) {
        Session
            .findById(req.params.id)
            .exec(function(err, session) {
                if(err)
                    return next(err);

                res.json(session);
            });
    };

    exports.createSession = function(req, res, next) {
        var session = new Session({
            userName: req.body.userName,
            equipmentId: req.body.equipmentId,
            cost: req.body.cost,
            duration: req.body.duration,
            initialTime: req.body.initialTime,
            finalTime: req.body.finalTime
        });

        session
            .save(function(err) {
                if(err)
                    return next(err);
            
                res.json(session);
            });
    };

    exports.updateSession = function(req, res, next) {
        var session = new Session({
            userName: req.body.userName,
            equipmentId: req.body.equipmentId,
            cost: req.body.cost,
            duration: req.body.duration,
            initialTime: req.body.initialTime,
            finalTime: req.body.finalTime,
            _id: req.params.id
        });

        Session
            .findByIdAndUpdate(req.params.id, session, {}, function(err) {
                if(err)
                    return next(err);

                res.json(session);
            });
    };

    exports.deleteSession = function(req, res, next) {
        Session
            .findByIdAndRemove(req.params.id, function(err, sessionDeleted){
                if(err)
                    return next(err);

                res.json(sessionDeleted);
            });
    };
})();
