(function(){
    'use strict';

    angular
        .module('manager')
        .component('home', {
            templateUrl: 'app/home/home.html',
            controller: homeCtrl,
            controllerAs: 'vm'
        });

    homeCtrl.$inject = ['DEFAULT', '$interval', 'E_TYPES', 'S_ACTION', 'EquipmentService', 'FaresService', 'SessionService', 'toastr'];

    function homeCtrl(DEFAULT, $interval, E_TYPES, S_ACTION, EquipmentService, FaresService, SessionService, toastr){
        var vm =  this;
        var fares = {};
        var interval;
        vm.E_TYPES = E_TYPES;

        // VIEW VARIABLES
        vm.time = new Date();
        vm.timeMs =  moment().unix();
        vm.equipments = [];
        vm.equipment = {};
        vm.timeLeft = null;

        // VIEW FUNCTIONS
        vm.calcCost = calcCost;
        vm.endSession = endSession;
        vm.initSession = initSession;
        vm.sessionModal = sessionModal;
        vm.$onInit = initialize;
        vm.$onDestroy = destroy;
        
        function initialize() {
            loadData();
            interval = $interval(updateValues, 1000);
        }

        function destroy() {
            $interval.cancel(interval);
        }

        function loadData() {
            FaresService.getFares()
                .then(function(_fares) {
                    fares = _fares;
                    return getEquipments();
                });
        }

        function getEquipments() {
            return EquipmentService.getEquipments()
                .then(function(equipments) {
                    vm.equipments = equipments;
                    return vm.equipments;
                });
        }

        function updateValues() {
            vm.time = new Date();
            vm.timeMs = moment().unix();

            angular.forEach(vm.equipments, function(e) {
                var footer = document.getElementById('footer-section-' + e._id);

                if(e.sessionId && e.sessionId.initialTime) {
                    var timeElapsed = calculateDateDiff(e.sessionId.initialTime, vm.timeMs);

                    e.timeElapsed = Math.round(timeElapsed.asMinutes());
                    e.timeLeft = Math.round(e.sessionId.duration - timeElapsed.asMinutes());

                    if(timeElapsed.asMinutes() >= 30)
                        e.sessionId.cost = FaresService.roundCost(timeElapsed.asHours() * fares[e.type].hour);

                    if (e.timeLeft > 4 && e.timeLeft < 6 && !e.timeAlertLowFired) {
                        toastr.warning(e.name + ': Restan ' + e.timeLeft + ' minutos', 'Advertencia');
                        e.timeAlertLowFired = true;
                    } else if (e.timeLeft > 2 && e.timeLeft < 4 && !e.timeAlertMediumFired) {
                        toastr.warning(e.name + ': Restan ' + e.timeLeft + ' minutos', 'Advertencia');
                        e.timeAlertMediumFired = true;
                    } else if (e.timeLeft <= 0 && !e.timeAlertHighFired) {
                        toastr.error(e.name + ': Tiempo agotado', 'Advertencia');
                        e.timeAlertHighFired = true;
                    }

                    e.action = S_ACTION.END;
                    footer.style.backgroundColor = '#FF0000';
                } else {
                    e.action = S_ACTION.INIT;
                    footer.style.backgroundColor = '#00FF00';
                }
            });
        }

        function calcCost(session) {
            if(session.duration <= 30) {
                session.cost = fares.initial;
            } else {
                session.cost = FaresService.roundCost((session.duration / 60) * fares.hour);
            }
        }

        function sessionModal(e, action) {
            vm.equipment = e;
            action === S_ACTION.INIT ? 
                $('#iSessionModal').modal('show'):
                $('#eSessionModal').modal('show');
        }

        function initSession(e) {
            var _e = e;

            _e.sessionId.equipmentId = _e._id;
            _e.sessionId.finalTime = null;
            _e.sessionId.initialTime = vm.timeMs;
            _e.sessionId.cost = fares[_e.type].initial;
            _e.sessionId.userName = _e.sessionId.userName || DEFAULT.USER_NAME;

            saveSession(_e.sessionId)
                .then(function(session) {
                    _e.sessionId = session._id;
                    saveE(_e, session);
                });
        }

        function endSession(e) {
            var _e = e;

            _e.sessionId.finalTime = vm.timeMs;
            _e.sessionId.duration = _e.timeElapsed;

            saveSession(_e.sessionId)
                .then(function() {
                    _e.sessionId = null;
                    saveE(_e, null);
                });
        }

        function saveSession(session) {
            return SessionService.saveSession(session);
        }

        function saveE(e, session) {
            var _e = e,
                _session = session;

            EquipmentService.saveEquipment(_e)
                .then(function() {
                    var index = vm.equipments.findIndex(function(e) {
                        return e._id === _e._id;
                    });

                    _e.sessionId = _session;

                    vm.equipments[index] = _e;
                })
                .finally(function() {
                    $('#iSessionModal').modal('hide');
                    $('#eSessionModal').modal('hide');
                });
        }

        // Calculate difference between to dates.
        function calculateDateDiff(date1, date2) {
            if(!date1 || !date2)
                return 0;
                
            var _date1 = moment.unix(date1);
            var _date2 = moment.unix(date2);
            var _duration = moment.duration(_date2.diff(_date1));

            return _duration;
        }
    }

})();