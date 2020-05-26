(function() {
    'use strict';

    angular
        .module('manager')
        .component('login', {
            templateUrl: 'app/login/login.html',
            controller: loginCtrl,
            controllerAs: 'vm'
        });

    loginCtrl.$inject = ['AuthService', '$state', 'toastr'];

    function loginCtrl(AuthService, $state, toastr) {
        var vm = this;

        vm.onSubmit = onSubmit;
        
        function onSubmit(user) {
            AuthService.login(user)
                .then(function(user) {
                    if(user)
                        $state.go('home');
                })
                .catch(function(error) {
                    toastr.error(error.message || 'Hubo un problema al efectuar la operación :(', 'Error');
                });
        }
    }

})();
