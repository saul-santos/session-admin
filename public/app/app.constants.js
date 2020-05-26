(function(){
    'use strict';

    angular
        .module('manager')
        .constant('DEFAULT', {
            USER_NAME: 'Sin usuario'
        })
        .constant('E_TYPES', {
            CONSOLE: 'console',
            PC: 'pc'
        })
        .constant('S_ACTION', {
            INIT: 'Iniciar',
            END: 'Finalizar',
        })
        .constant({'TOKEN_PREFIX': 'token'})
        .constant({'LOGGER': true})
        .constant('toastr', toastr)
        .constant('moment', moment);
    
})();
