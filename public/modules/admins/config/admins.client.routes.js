'use strict';

//Setting up route
angular.module('admins').config(['$stateProvider', 
	function($stateProvider) {
		// Admins state routing
		$stateProvider.
		state('admin', {
			url: '/admin',
			templateUrl: 'modules/admins/views/dashboard/main.html', 
			controller: 'AdminsController'
		}).
		state('admin.dashboard', {
			url: '/dashboard',
			templateUrl: 'modules/admins/views/list-admins.client.view.html'
		}).
		state('admin.appointments_view', {
			url: '/appointments/:appointmentId',
			templateUrl: 'modules/appointments/views/view-appointment.client.view.html',
			controller: 'AppointmentsController'
		}).
		state('adduser', {
			url: '/admin/create',
			templateUrl: 'modules/admins/views/create-admin.client.view.html',
			controller: 'AdminsController'
		}).
		state('admin.edituser', {
			url: '/:id/edit',
			templateUrl: 'modules/admins/views/edit-admin.client.view.html', 
			controller: 'AdminsController'
		}).
		state('editAdmin', {
			url: '/admins/:adminId/edit',
			templateUrl: 'modules/admins/views/edit-admin.client.view.html'
		});
	}
]);