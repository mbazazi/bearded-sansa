'use strict';

// Setting up route
angular.module('staff-onboard').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('onboard', {
			url: '/rmt',
			abstract: true,
			template: '<ui-view>',
			controller: 'StaffOnboardController'
   		}).
   		state('onboard.onboard_1', {
   			url: '/onboard', 
   			views:{
	                '': {templateUrl: 'modules/staff-onboard/views/staff-onboard.html', 
	             		controller: 'StaffOnboardController'
	             	},
	                'panel1@onboard.onboard_1': {
	                    templateUrl: 'modules/staff-onboard/views/onboard_1.html', 
	                    controller: 'StaffOnboardController'
   					}
              	} 
   		})
   		.state('onboard.onboard_2', {
   			url: '/apply', 
   			templateUrl: 'modules/staff-onboard/views/onboard_2.html', 
	        controller: 'StaffOnboardController'
	             	
             
   		})
   		.state('onboard.thanks', {
   			url: '/thanks', 
   			views:{
	                '': {templateUrl: 'modules/staff-onboard/views/thanks.html', 
	             		controller: 'StaffOnboardController'
	             	}
              	} 
   		})/*.
		state('user', {
                url: '/user/:userId/:userRole',
                views:{
	                '': {templateUrl: 'modules/users/views/settings/user.client.view.html', 
	             		controller: 'SettingsController'
	             	},
	                'userAppointments@user': {
	                    templateUrl: 'modules/appointments/views/appointments-view.html', 
	                    controller: 'AppointmentsController'
   					}, 
   					'profile@user': {
   						templateUrl: 'modules/users/views/partials/staff-profile.html', 
   						controller: 'SettingsController'
   					}
              	}  
         })*/;
	}
]);