(function(){
    'use strict';

    angular
        .module('manager')
        .filter('minutes', minutes)
        .filter('cost', cost);


    function minutes() {
        return function(number) {
            number = number || 0;
            return number + ' mins';
        };
    }

    function cost() {
        return function(number) {
            number = number || 0;
            return '$' + number;
        };
    }
    
})();
