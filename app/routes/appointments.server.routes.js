'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var appointments = require('../../app/controllers/appointments.server.controller');

	// Appointments Routes
	app.route('/appointments')
		.get(appointments.list)
		.post(users.requiresLogin, appointments.create)
		.delete(appointments.deleteCancelled);

	app.route('/appointments/:appointmentId')
		.get(appointments.read)
		.put(users.requiresLogin, appointments.update)
		.post(users.requiresLogin, appointments.cancel)
		.delete(users.requiresLogin, appointments.hasAuthorization, appointments.delete);

	app.route('/admin/appointments')
		.get(appointments.date);

	app.route('/appointments/accept/:staffId/appointmentId/:appointmentId')
		.get(users.requiresLogin, appointments.update);

	/*app.route('/cancel/:appointmentId')
		.get(users.requiresLogin, appointments.cancel);*/

	// Finish by binding the Appointment middleware
	app.param('appointmentId', appointments.appointmentByID);
};
