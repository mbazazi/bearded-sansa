'use strict';

//Setting up route
angular.module('charts').config(['$stateProvider',
	function($stateProvider) {
		// Charts state routing
		$stateProvider.
		state('rdash.charts', {
			url: '/charts',
			views:{
                '': {templateUrl: 'modules/charts/views/chart-view.html', 
                    controller: 'ChartCtrl', 
                    resolve: {
			        charts: ['Appointments', 'Authentication', function (Appointments, Authentication) {
			          return Appointments.query({jobDone: true, staff_id: Authentication.user._id}).$promise;
			    	    }], 
			    	 Appointments: 'Appointments'
			   		 }
                }
            }, 
            
		});
	}
]);