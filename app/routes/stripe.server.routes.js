'use strict';

var users = require('../../app/controllers/users.server.controller'),
	stripe = require('../../app/controllers/stripe.server.controller');

module.exports = function(app) {
	// Routing logic   

	app.route('/stripe')
		.get(stripe.list)
		.post(users.requiresLogin, stripe.createCustomer);

	app.route('/stripe/:stripeToken')
		.get(stripe.list)
		.post(users.requiresLogin, stripe.createCharge)
		.post(users.requiresLogin, stripe.createRefund);

	app.route('/stripe/refund/:chargeID')
		.post(users.requiresLogin, stripe.createRefund);
};