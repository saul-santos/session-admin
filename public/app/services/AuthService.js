(function() {
    'use strict';

    angular
        .module('manager')
        .factory('AuthService', AuthService);

    AuthService.$inject = ['TOKEN_PREFIX', '$state', '$http', '$cookies', '$q'];

    function AuthService(TOKEN_PREFIX, $state, $http, $cookies, $q) {
        var service = {};

        service.register = register;
        service.login = login;
        service.isLoggedIn = isLoggedIn;
        service.getUserDetails = getUserDetails;
        service.rolHasAccess = rolHasAccess;
        service.logout = logout;

        return service;

        // Public functions
        function register(user) {
            return $http.post('/api/register', user)
                .then(saveToken)
                .catch(handleError);
        }

        function login(user) {
            return $http.post('/api/login', user)
                .then(saveToken)
                .catch(handleError);
        }

        function isLoggedIn() {
            var user = getUserDetails();
            if(user) {
                return user.exp > Date.now() / 1000;
            } else {
                return false;
            }
        }

        function getUserDetails() {
            var token = getToken();
            var payload;

            if(token) {
                payload = token.split('.')[1];
                payload = window.atob(payload);
                return JSON.parse(payload);
            } else {
                return null;
            }
        }

        function rolHasAccess(rol) {
            var user = getUserDetails();

            if(user) {
                for(var i in rol) {
                    if(user.rol === rol[i])
                        return true;
                }
            }
            return false;
        }

        function logout() {
            removeToken();      // Removes token from cookies
            $state.go('login'); // Go to login state.
        }

        // Private functions.
        function saveToken(response){
            if(response.data && response.data.token) {
                setToken(response.data.token);
            } else {
                handleError({
                    error: { data: 'Fallo al obtener token del servidor.' }
                });
            }
            return $q.resolve(getUserDetails());
        }

        function setToken(jwt) {
            $cookies.put(TOKEN_PREFIX, jwt);
        }

        function getToken() {
            return $cookies.get(TOKEN_PREFIX);
        }

        function removeToken() {
            $cookies.remove(TOKEN_PREFIX);
        }

        function handleError(error) {
            Logger.error('XHR Failed for Authentication Service: ' + error.data.message);
            return $q.reject(error.data);
        }
    }

})();
