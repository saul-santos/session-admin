(function(){
    'use strict';

    angular
        .module('manager')
        .config(managerConfig)
        .run(authVerificator);


    // STATES.
    managerConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function managerConfig($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/login');

        var login = {
            name: 'login',
            url: '/login',
            component: 'login',
            data: {}
        };

        var home = {
            name: 'home',
            url: '/home',
            component: 'home',
            data: {
                permissions: {
                    rol: ['ADMIN', 'OPERATOR'],
                    token: true
                }
            }
        };

        var report = {
            name: 'report',
            url: '/report',
            component: 'report',
            data: {
                permissions: {
                    rol: ['ADMIN', 'OPERATOR'],
                    token: true
                }
            }
        };

        var settings = {
            name: 'settings',
            url: '/settings',
            component: 'settings',
            data: {
                permissions: {
                    rol: ['ADMIN'],
                    token: true
                }
            }
        };

        $stateProvider.state(login);
        $stateProvider.state(home);
        $stateProvider.state(report);
        $stateProvider.state(settings);
    }

    // AUTHORIZATION.
    authVerificator.$inject = ['$transitions'];

    function authVerificator($transitions) {
        $transitions.onStart({}, function(trans) {
            var AuthService = trans.injector().get('AuthService');

            var permissions = trans.to().data.permissions || null;

            if(permissions) {
                if(AuthService.isLoggedIn()) {
                    return AuthService.rolHasAccess(permissions.rol);
                }
                return trans.router.stateService.target('login');
            }

        });
    }

})();
