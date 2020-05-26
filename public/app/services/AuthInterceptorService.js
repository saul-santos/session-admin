(function() {
    'use strict';

    var app = angular.module('manager');

    app.factory('AuthInterceptorService', AuthInterceptorService);

    AuthInterceptorService.$inject = ['$q', '$cookies', '$state', 'TOKEN_PREFIX'];

    function AuthInterceptorService($q, $cookies, $state, TOKEN_PREFIX) {
        return {
            request: function(config) {
                config.headers = config.headers || {};
                var tokenJWT = $cookies.get(TOKEN_PREFIX);
                if(tokenJWT)
                    config.headers.Authorization = 'Bearer ' + tokenJWT;
                    
                return config;
            },
    
            responseError: function(rejection) {
                if(rejection.status === 401) {
                    $cookies.remove(TOKEN_PREFIX);
                    $state.go('login');
                }
                
                return $q.reject(rejection);
            }
        };
    }

    app.config(interceptorConfig);

    interceptorConfig.$inject = ['$httpProvider'];

    function interceptorConfig($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptorService');
    }

})();