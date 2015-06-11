'use strict';

//Setting up route
angular.module('appointments').config(['$stateProvider',
	function($stateProvider) {
		// Appointments state routing
		$stateProvider.
		state('appointments', {
			url: '/appointments',
			templateUrl: 'modules/appointments/views/list-appointments.client.view.html'
		}).
		state('create_appointment', {
			url: '/appointments/create',
			templateUrl: 'modules/appointments/views/create-appointment.client.view.html', 
			controller: 'AppointmentsController'
		}).
		state('appointments_view', {
			url: '/appointments/:appointmentId',
			templateUrl: 'modules/appointments/views/view-appointment.client.view.html'
		}).
		state('appointment_edit', {
			url: '/appointments/:appointmentId/edit',
			templateUrl: 'modules/appointments/views/edit-appointment.client.view.html'
		});


	}
]);