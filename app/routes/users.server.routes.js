'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function(app) {
	// User Routes
	var users = require('../../app/controllers/users.server.controller');
	var appointments = require('../../app/controllers/appointments.server.controller');

	// Setting up the users profile api
	app.route('/users').get(users.list);
	app.route('/users/me').get(users.me);
	app.route('/users').put(users.update);
	app.route('/users').post(users.create_user);
	
	app.route('/users/accounts').delete(users.removeOAuthProvider);
	app.route('/users/:id').delete(users.removeUser);
	app.route('/users').delete(users.removeAdmin);

	app.route('/users/:id').get(users.getOne);
	app.route('/users/:id').put(users.update);

	app.route('/staff').get(users.get_staff);
	app.route('/staff').post(users.new_staff_application);

	app.route('/staff/:id').delete(users.removeUser);
	app.route('/email/:appointmentId/:excludedUser').get(users.sendEmail);
	app.route('/email/done/:appointmentId').get(users.sendInvoice);
	app.route('/email/accept/:staffId/appointmentId/:appointmentId').get(appointments.update);


/*	app.route('/email/:staffId').get(users.sendAppointmentEmail);

	app.route('/users/:roles/:id').put(users.update);*/

	// Setting up the users password api
	app.route('/users/password').post(users.changePassword);
	app.route('/auth/forgot').post(users.forgot);
	app.route('/auth/reset/:token').get(users.validateResetToken);
	app.route('/auth/reset/:token').post(users.reset);

	// Setting up the users authentication api
	app.route('/auth/signup').post(users.signup);
	app.route('/auth/signin').post(users.signin);
	app.route('/auth/signout').get(users.signout);
	app.route('/auth/check_username').post(users.check_username);
	app.route('/auth/createuser').post(users.create_user);
	app.route('/auth/uploadAvatar').post(users.uploadAvatar).put(users.update);

	//Removes the User
	app.route('/auth/remove').post(users.removeUser);


	// Setting the facebook oauth routes
	app.route('/auth/facebook').get(passport.authenticate('facebook', {
		scope: ['email']
	}));
	app.route('/auth/facebook/callback').get(users.oauthCallback('facebook'));

	// Setting the twitter oauth routes
	app.route('/auth/twitter').get(passport.authenticate('twitter'));
	app.route('/auth/twitter/callback').get(users.oauthCallback('twitter'));

	// Setting the google oauth routes
	app.route('/auth/google').get(passport.authenticate('google', {
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email'
		]
	}));
	app.route('/auth/google/callback').get(users.oauthCallback('google'));

	// Setting the linkedin oauth routes
	app.route('/auth/linkedin').get(passport.authenticate('linkedin'));
	app.route('/auth/linkedin/callback').get(users.oauthCallback('linkedin'));

	// Setting the github oauth routes
	app.route('/auth/github').get(passport.authenticate('github'));
	app.route('/auth/github/callback').get(users.oauthCallback('github'));

	// Finish by binding the user middleware
	app.param('userId', users.userByID);
	app.param('appointmentId', appointments.appointmentByID);

};