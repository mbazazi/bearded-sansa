'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html', 
			controller: 'SettingsController'
		}).
		state('profile.payment', {
			url: '/payment',
			templateUrl: 'modules/users/views/settings/payment.client.view.html'
		})
		.
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('payment', {
			url: '/payment',
			templateUrl: 'modules/users/views/settings/payment.client.view.html', 
			controller: 'SettingsController'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		}).
		state('user', {
                url: '/user/:userId/:userRole',
                views:{
	                '': {templateUrl: 'modules/users/views/settings/user.client.view.html', 
	             		controller: 'SettingsController'
	             	},
	                'userAppointments@user': {
	                    templateUrl: 'modules/appointments/views/appointments-view.html', 
	                    controller: 'AppointmentsController', 
	                    resolve: {
                        	appointments: [ '$q', 'Appointments', function($q, Appointments){
                            var JobDone = Appointments.query({jobDone: true});
                            var notCancelled = Appointments.query({cancelled: false});
                            return $q.all([JobDone.$promise, notCancelled.$promise]);
                        	}]
                   		 }
   					}, 
   					'profile@user': {
   						templateUrl: 'modules/users/views/partials/staff-profile.html', 
   						controller: 'SettingsController'
   					}
              	}  
         });
	}
]);