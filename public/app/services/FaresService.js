(function() {
    'use strict';

    angular
        .module('manager')
        .factory('FaresService', FaresService);

    FaresService.$inject = ['$http', '$q'];

    function FaresService($http, $q){

        var service = {};

        service.getFares = getFares;
        service.saveFares = saveFares;
        service.roundCost = roundCost;

        return service;

        // Functions
        function getFares(){
            var deferred = $q.defer();
            $http.get('/api/fares')
                .then(function(data){
                    deferred.resolve(data.data);
                })
                .catch(function(err){
                    handleError(err);
                });
            return deferred.promise;
        }

        function saveFares(fares) {
            if(fares._id) {
                return createFares(fares);
            } else {
                return updateFares(fares);
            }
        }

        function createFares(fares){
            var deferred = $q.defer();
            $http.post('/api/fares', fares)
                .then(function(data){
                    deferred.resolve(data.data);
                })
                .catch(function(err){
                    handleError(err);
                });
            return deferred.promise;
        }

        function updateFares(fares, id){
            var deferred = $q.defer();
            $http.put('/api/fares/' + id, fares)
                .then(function(data){
                    deferred.resolve(data.data);
                })
                .catch(function(err){
                    handleError(err);
                });
            return deferred.promise;
        }

        function roundCost(cost) {
            var _costString = cost.toString();
            var _cost = cost;
            var _decimals;

            if(_costString.includes('.')) {
                _cost = parseInt(_costString.substring(0, _costString.indexOf('.')));
                _decimals = parseFloat(_costString.substring(_costString.indexOf('.')));

                if(_decimals > 0.2 && _decimals < 0.8) {
                    _cost = _cost + 0.5;
                } else {
                    _cost = _cost + 1;
                } 
            }
            return _cost;
        }

        function handleError(err) {
            Logger.error('XHR Failed for Fares Service: ' + err.data.message);
            return $q.reject(err.data);
        }
    }

})();
