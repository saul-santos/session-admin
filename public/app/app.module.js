(function(){
    'use strict';

    angular
        .module('manager', [
            'ui.router',
            'ngMessages',
            'ngCookies'
        ])
        .run(initlialize);

    initlialize.$inject = ['LOGGER'];

    function initlialize(LOGGER) {
        if(LOGGER) {
            Logger.useDefaults();
        } else {
            Logger.setLevel(Logger.OFF);
        }
    }

})();
