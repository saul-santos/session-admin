(function() {
    var Fares = require('../models/fares');

    exports.getFares = function(req, res, next) {
        Fares
            .findOne()
            .exec(function(err, fares) {
                if(err)
                    return next(err);

                res.json(fares);
            });
    };

    exports.createFares = function(req, res, next) {
        var fares = {};
        if(req.body.console && req.body.pc) {
            fares = new Fares({
                console: {
                    hour: req.body.console.hour,
                    initial: req.body.console.initial
                },
                pc: {
                    hour: req.body.pc.hour,
                    initial: req.body.pc.initial
                }
            });
        } else if(req.body.console) {
            fares = new Fares({
                console: {
                    hour: req.body.console.hour,
                    initial: req.body.console.initial
                }
            });
        } else if(req.body.pc) {
            fares = new Fares({
                pc: {
                    hour: req.body.pc.hour,
                    initial: req.body.pc.initial
                }
            });
        }

        fares
            .save(function(err) {
                if(err)
                    return next(err);
            
                res.json(fares);
            });
    };

    exports.updateFares = function(req, res, next) {
        var fares = new Fares({
            console: {
                hour: req.body.console.hour,
                initial: req.body.console.initial
            },
            pc: {
                hour: req.body.pc.hour,
                initial: req.body.pc.initial
            },
            _id: req.body._id
        });

        Fares
            .updateOne({_id: req.body._id}, fares, function(err) {
                if(err)
                    return next(err);

                res.json(fares);
            });
    };

    exports.deleteFares = function(req, res) {
        res.send('Not implemented yet');
    };
})();
