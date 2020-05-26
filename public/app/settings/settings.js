(function(){
    'use strict';

    angular
        .module('manager')
        .component('settings', {
            templateUrl: 'app/settings/settings.html',
            controller: settingsCtrl,
            controllerAs: 'vm'
        });

    settingsCtrl.$inject = ['E_TYPES', 'EquipmentService', 'FaresService'];

    function settingsCtrl(E_TYPES, EquipmentService, FaresService){
        // VARIABLES
        var vm = this;
        vm.E_TYPES = E_TYPES;
        vm.eType = E_TYPES.CONSOLE;
        vm.fares = {};
        vm.equipments = [];
        vm.equipment;
        
        // FUNCTIONS
        vm.$onInit = initialize;
        vm.saveE = saveE;
        vm.removeE = removeE;
        vm.updateFares = updateFares;
        vm.exchangeEType = exchangeEType;
        vm.openEModal = openEModal;

        function initialize() {
            loadData();
        }

        function loadData() {
            FaresService.getFares()
                .then(function(_fares) {
                    vm.fares = _fares;
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

        function exchangeEType(type) {
            type === E_TYPES.CONSOLE ? type = E_TYPES.PC : type = E_TYPES.CONSOLE;
            vm.eType = type;
            return type;
        }

        function updateFares(fares) {
            if(fares[vm.eType].initial) {
                if(fares[vm.eType].initial > 0 && fares[vm.eType].initial < 100) {
                    if(fares[vm.eType].hour) {
                        if(fares[vm.eType].hour > 0 && fares[vm.eType].hour < 100) {
                            saveFares(fares);
                        }
                    } else {
                        toastr.warning('Ingrese tarifa hora', 'Advertencia');
                    }
                }
            } else {
                toastr.warning('Ingrese tarifa inicial', 'Advertencia');
            }
        }

        function removeE(equipment) {
            if(equipment.sessionId) {
                toastr.warning(equipment.name + ' tiene una sesión abierta.', 'Advertencia');
                return; 
            }

            return EquipmentService.deleteEquipment(equipment._id)
                .then(function(equipment) {
                    removeLocalE(equipment);
                });
        }

        function removeLocalE(equipment) {
            var index = vm.equipments.findIndex(function(e) {
                return e._id === equipment._id;
            });

            delete vm.equipments[index];

            toastr.success('Equipo removido', 'Exito');
        }

        function saveE(equipment) {
            equipment.type = vm.eType;

            EquipmentService.saveEquipment(equipment)
                .then(function() {
                    toastr.success('Equipo guardado', 'Exito');
                    getEquipments();
                    closeEModal();
                });
        }

        function saveFares(fares) {
            FaresService.saveFares(fares)
                .then(function(data) {
                    vm.fares = data;
                    toastr.success('Tarifas guardadas', 'Exito');
                });
        }

        function openEModal(e) {
            vm.equipment = e || {};
            $('#eModal').modal('show');
        }

        function closeEModal() {
            $('#eModal').modal('hide');
        }

    }

})();