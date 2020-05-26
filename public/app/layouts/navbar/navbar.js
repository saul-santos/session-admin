(function(){
    'use strict';

    // COMPONENT.
    angular
        .module('manager')
        .component('navbar', {
            templateUrl: 'app/layouts/navbar/navbar.html',
            controller: navBarCtrl,
            controllerAs: 'vm'
        });

    navBarCtrl.$inject = ['AuthService'];

    // CONTROLLER.
    function navBarCtrl(AuthService) {
        var vm = this;

        vm.logout = logout;

        function logout() {
            AuthService.logout();
        }
    }

})();
