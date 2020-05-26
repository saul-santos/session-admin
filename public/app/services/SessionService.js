(function() {
    'use strict';

    angular
        .module('manager')
        .factory('SessionService', SessionService);

    SessionService.$inject = ['$http', '$q'];

    function SessionService($http, $q){

        var service = {};

        service.getSessions = getSessions;
        service.getSession = getSession;
        service.saveSession = saveSession;
        service.delSession  = delSession;

        return service;

        // Functions

        function getSessions(params){
            var deferred = $q.defer();
            $http.get('/api/sessions/' + params.start + '/' + params.end)
                .then(function(data){
                    deferred.resolve(data.data);
                })
                .catch(function(err){
                    handleError(err);
                });
            return deferred.promise;
        }

        function getSession(sessionId){
            var deferred = $q.defer();
            $http.get('/api/session/' + sessionId)
                .then(function(data){
                    deferred.resolve(data.data);
                })
                .catch(function(err){
                    handleError(err);
                });
            return deferred.promise;
        }

        function saveSession(session) {
            if(session._id) {
                return updateSession(session);
            } else {
                return createSession(session);
            }
        }

        function createSession(session){
            var deferred = $q.defer();
            $http.post('/api/session', session)
                .then(function(data){
                    deferred.resolve(data.data);
                })
                .catch(function(err){
                    handleError(err);
                });
            return deferred.promise;
        }

        function updateSession(session){
            var deferred = $q.defer();
            $http.put('/api/session/' + session._id, session)
                .then(function(data){
                    deferred.resolve(data.data);
                })
                .catch(function(err){
                    handleError(err);
                });
            return deferred.promise;
        }

        function delSession(id){
            var deferred = $q.defer();
            $http.delete('/api/session/' + id)
                .then(function(data){
                    deferred.resolve(data.data);
                })
                .catch(function(err){
                    handleError(err);
                });
            return deferred.promise;
        }

        function handleError(err) {
            Logger.error('XHR Failed for Session Service: ' + err.data.message);
            return $q.reject(err.data);
        }
    }

})();
