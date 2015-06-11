'use strict';

//Setting up route
angular.module('rdash').config(['$stateProvider',
	function($stateProvider) {
		// Rdash state routing

        // Application routes
        $stateProvider
            .state('rdash', {
                url: '/dashboard',
                templateUrl: 'modules/rdash/views/main.html'
            })
            .state('rdash.dash', {
                url: '/admin',
                templateUrl: 'modules/rdash/views/dashboard.html'
            })
              .state('rdash.dash.view', {
               url: '/appointments/:appointmentId',
                templateUrl: 'modules/appointments/views/view-appointment.client.view.html',
                controller: 'AppointmentsController'
            })

            .state('rdash.tables', {
                url: '/tables',
                templateUrl: 'modules/rdash/views/tables.html'
            })
            .state('rdash.user', {
                url: '/:userId/:userRole',
                templateUrl: 'modules/users/views/settings/user.client.view.html',
                controller: 'AdminsController'
            }).
            state('userAppointment', {
                url: '/appointments/:userId'
            });

	}
]).run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
         $rootScope.$on('$stateChangeStart', 
        function(event, toState, toParams, fromState, fromParams){ 
          /*  console.log(fromParams);
            console.log(fromState);
            console.log(toState);*/
        });

    }]);

/*run('$rootScope'), function($rootScope){
    
});*/