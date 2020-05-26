(function() {
    'use strict';
    
    var express = require('express');
    var router = express.Router();

    var jwt = require('express-jwt');
    var auth = jwt({
        secret: process.env.JWT_KEY || 'MY_SECRET',
        userProperty: 'payload'
    });
    
    var authenticationCtrl = require('../controllers/authenticationCtrl');
    var profileCtrl = require('../controllers/profileCtrl');
    var equipmentCtrl = require('../controllers/equipmentCtrl');
    var sessionCtrl = require('../controllers/sessionCtrl');
    var faresCtrl = require('../controllers/faresCtrl');

    // USERS
    router.post('/register', authenticationCtrl.register);
    router.post('/login', authenticationCtrl.login);
    router.get('/profile/:id', profileCtrl.profileRead);
    
    // EQUIPMENT
    router.get('/equipments', auth, equipmentCtrl.getEquipments);
    router.get('/equipment/:id', auth, equipmentCtrl.getEquipment);
    router.post('/equipment', auth, equipmentCtrl.createEquipment);
    router.put('/equipment/:id', auth, equipmentCtrl.updateEquipment);
    router.delete('/equipment/:id', auth, equipmentCtrl.deleteEquipment);
    
    // SESSIONS
    router.get('/sessions/:start/:end', auth, sessionCtrl.getSessions);
    router.get('/session/:id', auth, sessionCtrl.getSession);
    router.post('/session', auth, sessionCtrl.createSession);
    router.put('/session/:id', auth, sessionCtrl.updateSession);
    router.delete('/session/:id', auth, sessionCtrl.deleteSession);
    
    // FARES
    router.get('/fares', auth, faresCtrl.getFares);
    router.post('/fares', auth, faresCtrl.createFares);
    router.put('/fares/:id', auth, faresCtrl.updateFares);
    router.delete('/fares/:id', auth, faresCtrl.deleteFares);
    
    // ANGULAR APP
    router.get('*', function(req, res) {
        res.sendFile('../public/index.html');
    });
    
    module.exports = router;    

})();
