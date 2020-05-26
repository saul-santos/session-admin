(function(){
    'use strict';
    angular
        .module('manager')
        .factory('EquipmentService', EquipmentService);

    EquipmentService.$inject = ['$http', '$q'];

    function EquipmentService($http, $q){

        var service = {};

        service.getEquipments = getEquipments;
        service.getEquipment = getEquipment;
        service.saveEquipment = saveEquipment;
        service.deleteEquipment = deleteEquipment;

        return service;

        // Functions
        function getEquipments(){
            var deferred = $q.defer();
            $http.get('/api/equipments')
                .then(function(data){
                    deferred.resolve(data.data);
                })
                .catch(function(err){
                    handleError(err);
                });
            return deferred.promise;
        }

        function getEquipment(id){
            var deferred = $q.defer();
            $http.get('/api/equipment/'+ id)
                .then(function(data){
                    deferred.resolve(data.data);
                })
                .catch(function(err){
                    handleError(err);
                });
            return deferred.promise;
        }

        function saveEquipment(equipment) {
            if(equipment._id) {
                return updateEquipment(equipment);
            } else {
                return createEquipment(equipment);
            }
        }

        function createEquipment(equipment){
            var deferred = $q.defer();
            $http.post('/api/equipment', equipment)
                .then(function(data){
                    deferred.resolve(data.data);
                })
                .catch(function(err){
                    handleError(err);
                });
            return deferred.promise;
        }

        function updateEquipment(equipment){
            var deferred = $q.defer();
            $http.put('/api/equipment/' + equipment._id, equipment)
                .then(function(data){
                    deferred.resolve(data.data);
                })
                .catch(function(err){
                    handleError(err);
                });
            return deferred.promise;
        }

        function deleteEquipment(id){
            var deferred = $q.defer();
            $http.delete('/api/equipment/' + id)
                .then(function(data){
                    deferred.resolve(data.data);
                })
                .catch(function(err){
                    handleError(err);
                });
            return deferred.promise;
        }

        function handleError(err) {
            Logger.error('XHR Failed for Equipment Service: ' + err.data.message);
            return $q.reject(err.data);
        }
    }

})();
