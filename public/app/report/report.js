(function(){
    'use strict';

    angular
        .module('manager')
        .component('report', {
            templateUrl: 'app/report/report.html',
            controller: reportCtrl,
            controllerAs: 'vm'
        });

    reportCtrl.$inject = ['SessionService'];

    function reportCtrl(SessionService){
        var vm = this;
        vm.$onInit = initialize;

        vm.sessions = [];
        vm.equipments = [];
        vm.dateForm = {};

        vm.getSessions = getSessions;
        
        function initialize() {
            var params = {
                start: moment().startOf('day'),
                end: moment()
            };

            $(function () {
                $('#dateFormStart').datetimepicker({
                    icons: { time: 'far fa-clock' },
                    defaultDate: params.start
                });
                $('#dateFormEnd').datetimepicker({
                    icons: { time: 'far fa-clock'},
                    defaultDate: params.end
                });
            });

            getSessions(params);
        }

        function getSessions(params) {
            if(!params) {
                params = {
                    start: moment(document.getElementById('dateStart').value, 'MM/DD/YYYY hh:mm A'),
                    end: moment(document.getElementById('dateEnd').value, 'MM/DD/YYYY hh:mm A').add(1, 'minutes')
                };
            }

            var _params = {
                start: params.start.unix(),
                end: params.end.unix()
            };

            SessionService.getSessions(_params)
                .then(function(sessions) {
                    vm.sessions = sessions;
                })
                .catch(function(err) {
                    Logger.error(err);
                });
        }

    }

})();